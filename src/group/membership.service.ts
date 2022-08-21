import { HttpException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFor } from 'nest-transact';
import { isDefined, isNotDefined } from 'src/tools';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { Membership } from './entities/membership.entity';

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
    const user = await this.userService.findUserById(userId);
    const group = await this.groupService.create(groupData);
    const membership = await this.createAdminMembership(user, group);
    if (isNotDefined(membership)) {
      throw new HttpException('Error during membership creation.', 400);
    }
    return group;
  }

  async createAdminMembership(user: User, group: Group) {
    const membership = await this.membershipRepository.findOne({
      where: { user, group },
    });
    if (isDefined(membership)) {
      throw new HttpException('User already belongs to this group.', 400);
    }
    return this.membershipRepository.save({
      group: group,
      user: user,
      isAdmin: true,
    });
  }

  async findMembersByGroupId(groupId: number) {
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
}
