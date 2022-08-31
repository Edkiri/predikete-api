import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { GroupService } from '../../group/services/group.service';
import { MembershipService } from './membership.service';
import { CreateGroupInvitationDto } from 'src/group/dto/create-invitation.dto';
import { GroupInvitation } from '../entities/group-invitation.entity';
import { AcceptOrRejectDto } from '../../group/dto/accept-or-reject.dto';
import { TransactionFor } from 'nest-transact';
import { ModuleRef } from '@nestjs/core';
import { Membership } from '../entities';
import { PoolService } from 'src/pool/services/pool.service';

@Injectable()
export class GroupInvitationService extends TransactionFor<GroupInvitationService> {
  constructor(
    @InjectRepository(GroupInvitation)
    private readonly groupInvitationRepository: Repository<GroupInvitation>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly membershipService: MembershipService,
    private readonly poolService: PoolService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async findOne(invitationId: number): Promise<GroupInvitation> {
    const invitation = await this.groupInvitationRepository.findOne({
      where: { id: invitationId },
    });
    if (!invitation) {
      throw new HttpException(
        `Not found invitation with id '${invitationId}.'`,
        404,
      );
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
    const oldMember = await this.membershipService.findMember(
      groupId,
      sentToUserId,
    );
    if (oldMember)
      throw new HttpException(
        `User with id '${sentToUserId}' is already member.`,
        400,
      );
    const oldInvitation = await this.groupInvitationRepository.findOne({
      where: {
        group: { id: groupId },
        issuedTo: { id: sentToUserId },
        issuedBy: { id: issuedById },
      },
    });
    if (oldInvitation) {
      throw new HttpException(
        `Invitation already sent to user with id '${sentToUserId}'.`,
        400,
      );
    }
    const issuedBy = await this.userService.findOne(issuedById);
    const issuedTo = await this.userService.findOne(sentToUserId);
    const group = await this.groupService.findOne(groupId);
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
  ): Promise<Membership | undefined> {
    const invitation = await this.findOne(invitationId);

    if (operation.accept) {
      const membership = await this.membershipService.create(
        invitation.issuedTo.id,
        invitation.group.id,
      );
      await this.poolService.create({
        owner: invitation.issuedTo,
        group: invitation.group,
      });
      const invitationsToDelete = await this.groupInvitationRepository.find({
        where: {
          group: { id: invitation.group.id },
          issuedTo: { id: invitation.issuedTo.id },
        },
      });
      invitationsToDelete.map(async (invitation) => {
        await this.groupInvitationRepository.delete(invitation.id);
      });
      return membership;
    }
    await this.groupInvitationRepository.delete(invitation.id);
    return;
  }
}
