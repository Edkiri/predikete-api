import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './model/group.model';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(data: CreateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { name: data.name },
    });
    if (group) {
      throw new HttpException('Name already in used', 400);
    }
    const newGroup = await this.groupRepository.save(data);
    return newGroup;
  }
}
