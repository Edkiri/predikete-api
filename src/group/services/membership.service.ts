import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { isDefined, isNotDefined } from 'src/tools';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { GroupService } from './group.service';
import { Group } from '../entities/group.entity';
import { Membership } from '../entities/membership.entity';

@Injectable()
export class MembershipService extends TransactionFor<MembershipService> {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async createGroupAndMembership(
    groupData: CreateGroupDto,
    userId: number,
  ): Promise<Group> {
    const user = await this.userService.findOne(userId);
    const group = await this.groupService.create(groupData);
    const membership = await this.create(user, group, true);
    if (isNotDefined(membership)) {
      throw new HttpException('Error during membership creation.', 500);
    }
    return group;
  }

  async create(user: User, group: Group, isAdmin = false) {
    const membership = await this.membershipRepository.findOne({
      where: { user: { id: user.id }, group: { id: group.id } },
    });
    if (isDefined(membership)) {
      throw new HttpException('User already belongs to this group.', 400);
    }
    return this.membershipRepository.save({
      group: group,
      user: user,
      isAdmin,
    });
  }

  async findGroupMembers(groupId: number) {
    const group = await this.groupService.findOne(groupId);
    const memberships = await this.membershipRepository.find({
      where: { group: { id: group.id } },
    });
    if (!memberships.length) {
      throw new HttpException(
        'Group without members, this shouldn`t happen.',
        500,
      );
    }
    return memberships;
  }

  async findMember(group: Group, user: User): Promise<Membership | null> {
    return this.membershipRepository.findOne({
      where: { group: { id: group.id }, user: { id: user.id } },
    });
  }

  async findUserAdminMemberships(userId: number): Promise<Membership[] | []> {
    const adminMemberships = await this.membershipRepository.find({
      where: { user: { id: userId }, isAdmin: true },
    });
    return adminMemberships;
  }
}
