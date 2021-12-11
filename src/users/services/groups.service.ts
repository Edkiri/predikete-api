import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayloadToken } from 'src/auth/models/token.model';
import { Repository } from 'typeorm';
import { CreateGroupDto } from '../dtos/group.dto';
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
    const group = this.groupsRepo.findOne(id, {
      relations: [
        'memberships',
        'memberships.user',
        'memberships.user.profile',
      ],
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
}
