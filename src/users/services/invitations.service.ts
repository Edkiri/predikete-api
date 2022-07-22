import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { Repository } from 'typeorm';
import { CreateInvitationDto, UseInvitationDto } from '../dtos/invitations.dto';

import { Invitation } from '../entities/invitation.entity';
import { User } from '../entities/user.entity';
import { GroupsService } from './groups.service';
import { MembershipsService } from './memberships.service';
import { UsersService } from './users.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationsRepo: Repository<Invitation>,
    private readonly userService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async findOne(id: number) {
    const invitation = await this.invitationsRepo.findOne(id, {
      relations: [
        'group',
        'group.memberships',
        'group.memberships.user',
        'issuedBy',
        'issuedBy.profile',
        'issuedTo',
      ],
    });
    if (!invitation) {
      throw new NotFoundException(`Invitation #${id} not found`);
    }
    return invitation;
  }

  async findByUser(user: User) {
    const invitations = await this.invitationsRepo.find({
      where: { issuedTo: user },
      relations: [
        'group',
        'issuedBy',
        'group.memberships',
        'group.memberships.user',
      ],
    });
    for (const invitation of invitations) {
      invitation['type'] = 'invitation';
    }
    return invitations;
  }

  async create(user: PayloadToken, groupId: number, data: CreateInvitationDto) {
    const group = await this.groupsService.findOne(groupId);
    const issuedTo = await this.userService.findByEmail(data.email);
    const isMember = await this.membershipsService.isMember(issuedTo, group);
    if (isMember) {
      throw new BadRequestException(
        `User ${issuedTo.id} is already a member of group ${groupId}`,
      );
    }
    const issuedBy = await this.userService.findOne(user.sub);
    const oldInvitation = await this.invitationsRepo.findOne({
      issuedBy,
      issuedTo,
      group,
    });
    if (oldInvitation) {
      throw new BadRequestException('You have already invited this user');
    }
    return this.invitationsRepo.save({
      issuedTo,
      issuedBy,
      group,
      ...data,
    });
  }

  async useInvitation(
    invitationId: number,
    userId: number,
    data: UseInvitationDto,
  ) {
    const user = await this.userService.findOne(userId);
    const invitation = await this.findOne(invitationId);
    const { accept } = data;
    if (!accept) {
      this.invitationsRepo.remove(invitation);
      return {
        message: 'Invitation declined',
      };
    }
    const { group } = invitation;
    const membership = await this.membershipsService.create(user, group);
    this.invitationsRepo.remove(invitation);
    return membership;
  }
}
