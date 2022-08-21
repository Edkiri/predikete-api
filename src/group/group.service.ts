import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNotDefined } from 'src/tools';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';

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

  async findOne(id: number) {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (isNotDefined(group)) {
      throw new HttpException(`Not found group with id '${id}'`, 404);
    }
    return group;
  }
}
