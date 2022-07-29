import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { ILike, Repository } from 'typeorm';
import {
  CreateGroupDto,
  FindGorupByNameDto,
  UpdateGroupDto,
} from '../dtos/group.dto';
import { Group } from '../entities/group.entity';
import { MembershipsService } from './memberships.service';
import { UsersService } from './users.service';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupsRepo: Repository<Group>,
    private readonly userService: UsersService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async findOne(id: number) {
    const group = this.groupsRepo.findOne({
      where: { id },
      relations: {
        memberships: {
          user: {
            profile: true,
          },
        },
      },
    });
    if (!group) {
      throw new NotFoundException(`Group #${id} not found`);
    }
    return group;
  }

  async create(payload: PayloadToken, data: CreateGroupDto) {
    const user = await this.userService.findOne(payload.sub);
    const group = await this.groupsRepo.save(data);
    await this.membershipsService.createAdmin(user, group);
    return group;
  }

  async update(groupId: number, data: UpdateGroupDto) {
    const group = await this.findOne(groupId);
    if (data.picture === null) {
      data.picture = group.picture;
    }
    this.groupsRepo.merge(group, data);
    return this.groupsRepo.save(group);
  }

  async findByName(params: FindGorupByNameDto) {
    const { groupName } = params;
    const take = params.take || 3;
    const skip = params.skip || 0;
    const [result, total] = await this.groupsRepo.findAndCount({
      where: { name: ILike(`%${groupName}%`) },
      take,
      skip,
    });
    return {
      data: result,
      count: total,
    };
  }

  async isMember(groupId: number, userId: number) {
    const user = await this.userService.findOne(userId);
    const group = await this.findOne(groupId);
    return this.membershipsService.isMember(user, group);
  }
}
