import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { isDefined, isNotDefined } from 'src/tools';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from 'src/group/dto/create-group.dto';
import { GroupService } from 'src/group/services/group.service';
import { Group } from '../entities/group.entity';
import { Membership } from '../entities/membership.entity';
import { PoolService } from 'src/pool/services/pool.service';

@Injectable()
export class MembershipService extends TransactionFor<MembershipService> {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
    private readonly poolService: PoolService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async createGroupMembershipAndPool(
    groupData: CreateGroupDto,
    userId: number,
  ): Promise<Group> {
    const group = await this.groupService.create(groupData);
    const membership = await this.create(userId, group.id, true);
    const pool = await this.poolService.create({
      owner: membership.user,
      group,
    });
    if (isNotDefined(membership)) {
      throw new HttpException('Error during membership creation.', 500);
    }
    if (isNotDefined(pool)) {
      throw new HttpException('Error during pool creation.', 500);
    }
    return group;
  }

  async create(userId: number, groupId: number, isAdmin = false) {
    const membership = await this.membershipRepository.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
    });
    if (isDefined(membership)) {
      throw new HttpException('User already belongs to this group.', 400);
    }
    const user = await this.userService.findOne(userId);
    const group = await this.groupService.findOne(groupId);
    return this.membershipRepository.save({ group, user, isAdmin });
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

  async findMember(
    groupId: number,
    userId: number,
  ): Promise<Membership | null> {
    const group = await this.groupService.findOne(groupId);
    const user = await this.userService.findOne(userId);
    return this.membershipRepository.findOne({
      where: { user: { id: user.id }, group: { id: group.id } },
    });
  }

  async findUserAdminMemberships(userId: number): Promise<Membership[] | []> {
    const adminMemberships = await this.membershipRepository.find({
      where: { user: { id: userId }, isAdmin: true },
    });
    return adminMemberships;
  }
}
