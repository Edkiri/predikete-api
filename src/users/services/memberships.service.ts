import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { PoolsService } from 'src/pools/services/pools.service';
import { Repository } from 'typeorm';
import { FindGroupsByUserDto } from '../dtos/group.dto';
import { Group } from '../entities/group.entity';
import { Membership } from '../entities/membership.entity';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class MembershipsService {
  private poolsService: PoolsService;
  private usersService: UsersService;
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepo: Repository<Membership>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.poolsService = this.moduleRef.get(PoolsService, { strict: false });
    this.usersService = this.moduleRef.get(UsersService, { strict: false });
  }

  async create(user: User, group: Group) {
    const isMember = await this.isMember(user, group);
    if (isMember) {
      throw new BadRequestException(`User is already a member of this group`);
    }
    const membership = await this.membershipsRepo.save({ user, group });
    this.poolsService.create(membership);
    return membership;
  }

  async findByUserAndGroup(userId: number, groupId: number) {
    const membership = await this.membershipsRepo.findOne({
      where: { user: { id: userId }, group: { id: groupId } },
      relations: {
        group: true,
      },
    });
    if (!membership) {
      throw new NotFoundException(
        `Membership with user #${userId} and group #${groupId} not found`,
      );
    }
    return membership;
  }

  async createAdmin(user: User, group: Group) {
    const membership = await this.create(user, group);
    membership.is_admin = true;
    return this.membershipsRepo.save(membership);
  }

  async findByUser(userId: number, params: FindGroupsByUserDto) {
    const take = params.take || 3;
    const skip = params.skip || 0;
    const [result, total] = await this.membershipsRepo.findAndCount({
      where: { user: { id: userId } },
      take,
      skip,
      relations: {
        group: {
          memberships: {
            user: true,
          },
        },
      },
    });
    return {
      data: result,
      count: total,
    };
  }

  async findAdminGroups(user: User) {
    const memberships = await this.membershipsRepo.find({
      where: { user: { id: user.id }, is_admin: true },
      relations: ['group', 'user'],
    });
    return memberships;
  }

  async isMember(user: User, group: Group) {
    const membership = await this.membershipsRepo.findOne({
      where: { user: { id: user.id }, group: { id: group.id } },
    });
    return Boolean(membership);
  }
}
