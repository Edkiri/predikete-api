import { Injectable } from '@nestjs/common';
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

  async update(userId: number, data: UpdateProfileDto) {
    const user = await this.userService.findOne(userId);
    const profile = user.profile;
    this.profileRepo.merge(profile, data);
    return this.profileRepo.save(profile);
  }
}
