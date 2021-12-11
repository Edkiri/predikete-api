import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { Repository } from 'typeorm';
import { AddMemberDto } from '../dtos/membership.dto';
import { Group } from '../entities/group.entity';
import { Membership } from '../entities/membership.entity';
import { User } from '../entities/user.entity';
import { InvitationsService } from './invitations.service';
import { UsersService } from './users.service';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
    @InjectRepository(Group)
    private readonly groupsRepo: Repository<Group>,
    private readonly invitationsService: InvitationsService,
    private readonly usersService: UsersService,
  ) {}

  async createAdmin(user: User, group: Group) {
    const membership = this.membershipsRepo.create({ user, group });
    membership.is_admin = true;
    this.invitationsService.createAdminInvitations(user, group);
    membership.remainingInvitations = 10;
    return this.membershipsRepo.save(membership);
  }

  async createByInvitationCode(
    user: PayloadToken,
    groupId: number,
    data: AddMemberDto,
  ) {
    const group = await this.groupsRepo.findOne(groupId);
    if (!group) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }
    const invitation = await this.invitationsService.findByCode(data.code);
    const newMember = await this.usersService.findOne(user.sub);
    const memberships = await this.membershipsRepo.find({
      where: { user: newMember, group: group },
    });
    if (memberships.length > 0) {
      throw new UnauthorizedException('User is already in the group');
    }
    const newMembership = this.membershipsRepo.create({
      user: newMember,
      group: group,
    });
    newMembership.invitedBy = invitation.issuedBy;
    await this.invitationsService.createMemberInvitations(newMember, group);
    await this.invitationsService.useInvitation(invitation, newMember);
    return this.membershipsRepo.save(newMembership);
  }
}
