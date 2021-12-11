import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { Repository } from 'typeorm';

import { Group } from '../entities/group.entity';
import { Invitation } from '../entities/invitation.entity';
import { Membership } from '../entities/membership.entity';
import { User } from '../entities/user.entity';
import { randomString } from '../utils/randomString';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Group) private readonly groupsRepo: Repository<Group>,
    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
    @InjectRepository(Invitation)
    private readonly invitationsRepo: Repository<Invitation>,
  ) {}

  async createAdminInvitations(user: User, group: Group) {
    for (let i = 0; i < 10; i++) {
      const code = randomString(25);
      const invitation = this.invitationsRepo.create({
        code: code,
        issuedBy: user,
        group: group,
      });
      await this.invitationsRepo.save(invitation);
    }
  }

  async getUserInvitations(user: PayloadToken, groupId: number) {
    const group = await this.groupsRepo.findOne(groupId);
    if (!group) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }
    const invitations = await this.invitationsRepo.find({
      where: { issuedBy: user.sub, group, used: false },
    });
    return invitations.map((item) => item.code);
  }

  async findByCode(code: string) {
    const invitation = await this.invitationsRepo.findOne({
      where: { code, used: false },
      relations: ['issuedBy', 'group'],
    });
    if (!invitation) {
      throw new NotFoundException(`Invalid invitation code`);
    }
    return invitation;
  }

  async createMemberInvitations(user: User, group: Group) {
    for (let i = 0; i < 5; i++) {
      const code = randomString(25);
      const invitation = this.invitationsRepo.create({
        code: code,
        issuedBy: user,
        group: group,
      });
      await this.invitationsRepo.save(invitation);
    }
  }

  async useInvitation(invitation: Invitation, user: User) {
    const member = await this.membershipsRepo.findOne({
      where: { user: invitation.issuedBy, group: invitation.group },
    });
    member.remainingInvitations--;
    await this.membershipsRepo.save(member);
    invitation.usedBy = user;
    invitation.used = true;
    return this.invitationsRepo.save(invitation);
  }
}
