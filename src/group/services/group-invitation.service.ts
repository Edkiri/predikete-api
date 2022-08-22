import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { GroupService } from './group.service';
import { MembershipService } from './membership.service';
import { CreateGroupInvitationDto } from '../dto/create-invitation.dto';
import { GroupInvitation } from '../entities/group-invitation.entity';
import { AcceptOrRejectDto } from '../dto/accept-or-reject.dto';

@Injectable()
export class GroupInvitationService {
  constructor(
    @InjectRepository(GroupInvitation)
    private readonly groupInvitationRepository: Repository<GroupInvitation>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly membershipService: MembershipService,
  ) {}

  async findOne(id: number): Promise<GroupInvitation> {
    const invitation = await this.groupInvitationRepository.findOne({
      where: { id },
      relations: {
        group: true,
      },
    });
    if (!invitation) {
      throw new HttpException(`Not found invitation with id '${id}.'`, 404);
    }
    return invitation;
  }

  async findUserInvitations(
    issuedToId: number,
  ): Promise<GroupInvitation[] | []> {
    const invitations = await this.groupInvitationRepository.find({
      where: { issuedTo: { id: issuedToId } },
    });
    return invitations;
  }

  async createGroupInvitation(
    issuedById: number,
    groupId: number,
    payload: CreateGroupInvitationDto,
  ): Promise<GroupInvitation> {
    const { sentToUserId, message } = payload;
    const issuedTo = await this.userService.findUserById(sentToUserId);
    const group = await this.groupService.findOne(groupId);
    const oldMember = await this.membershipService.findMember(group, issuedTo);
    if (oldMember)
      throw new HttpException(
        `User with id '${sentToUserId}' is already member.`,
        400,
      );
    const oldInvitation = await this.groupInvitationRepository.findOne({
      where: {
        group: { id: group.id },
        issuedTo: { id: issuedTo.id },
        issuedBy: { id: issuedById },
      },
    });
    if (oldInvitation) {
      throw new HttpException(
        `Invitation already sent to user with id '${issuedTo.id}'.`,
        400,
      );
    }
    const issuedBy = await this.userService.findUserById(issuedById);
    const invitation = await this.groupInvitationRepository.save({
      issuedBy,
      issuedTo,
      group,
      message,
    });
    return this.groupInvitationRepository.findOneOrFail({
      where: { id: invitation.id },
    });
  }

  async useInvitation(
    invitationId: number,
    operation: AcceptOrRejectDto,
  ): Promise<void> {
    const invitation = await this.findOne(invitationId);
    if (operation.accept) {
      await this.membershipService.create(
        invitation.issuedTo,
        invitation.group,
      );
      const invitationsToDelete = await this.groupInvitationRepository.find({
        where: {
          group: { id: invitation.group.id },
          issuedTo: { id: invitation.issuedTo.id },
        },
      });
      invitationsToDelete.map(async (invitation) => {
        await this.groupInvitationRepository.delete(invitation.id);
      });
      return;
    }
    await this.groupInvitationRepository.delete(invitation.id);
    return;
  }
}
