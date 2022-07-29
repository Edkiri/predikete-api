import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRequestDto, UseRequestDto } from '../dtos/request.dto';
import { Request } from '../entities/request.entity';
import { User } from '../entities/user.entity';
import { GroupsService } from './groups.service';
import { MembershipsService } from './memberships.service';
import { UsersService } from './users.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestsRepo: Repository<Request>,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async findOne(id: number) {
    const request = await this.requestsRepo.findOne({
      where: { id },
      relations: {
        group: {
          memberships: {
            user: true,
          },
        },
        issuedBy: {
          profile: true,
        },
      },
    });
    if (!request) {
      throw new NotFoundException(`Request #${id} not found`);
    }
    return request;
  }

  async findByAdmin(user: User) {
    const memberships = await this.membershipsService.findAdminGroups(user);
    const groupIds = memberships.map((membership) => membership.group.id);
    const requests = await this.requestsRepo.find({
      where: { group: { id: In(groupIds) } },
      relations: {
        group: {
          memberships: {
            user: true,
          },
        },
        issuedBy: true,
      },
    });
    for (const request of requests) {
      request['type'] = 'request';
    }
    return requests;
  }

  async create(userId: number, groupId: number, data: CreateRequestDto) {
    const user = await this.usersService.findOne(userId);
    const group = await this.groupsService.findOne(groupId);
    const oldRequest = await this.requestsRepo.findOne({
      where: {
        issuedBy: user,
        group,
      },
    });
    if (oldRequest) {
      throw new BadRequestException(
        `User ${user.id} has already made the request to join group ${group.id}`,
      );
    }
    const request = await this.requestsRepo.save({
      issuedBy: user,
      group,
      ...data,
    });
    return request
      ? { message: 'created' }
      : { message: 'Request have not been created' };
  }

  async useRequest(requestId: number, data: UseRequestDto) {
    const request = await this.findOne(requestId);
    const { accept } = data;
    if (!Boolean(accept)) {
      this.requestsRepo.remove(request);
      return {
        message: 'Request rejected',
      };
    }
    const { issuedBy, group } = request;
    const membership = await this.membershipsService.create(issuedBy, group);
    this.requestsRepo.remove(request);
    return membership;
  }

  async findByGroupAndUser(groupId: number, userId: number) {
    return this.requestsRepo.findOne({
      where: { group: { id: groupId }, issuedBy: { id: userId } },
    });
  }
}
