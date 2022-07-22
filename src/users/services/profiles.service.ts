import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';
import { UsersService } from './users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
    private readonly userService: UsersService,
  ) {}

  async findOne(id: number) {
    const profile = await this.profileRepo.findOne(id, { relations: ['user'] });
    if (!profile) {
      throw new NotFoundException(`Profile #${id} not found`);
    }
    return profile;
  }

  async update(userId: number, data: UpdateProfileDto) {
    const user = await this.userService.findOne(userId);
    const profile = user.profile;
    if (data.picture === null) {
      data.picture = profile.picture;
    }
    this.profileRepo.merge(profile, data);
    await this.profileRepo.save(profile);
    return user;
  }
}
