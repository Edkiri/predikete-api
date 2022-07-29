import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { PoolsService } from 'src/pools/services/pools.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UsersService {
  private poolsService: PoolsService;
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepo: Repository<Profile>,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.poolsService = this.moduleRef.get(PoolsService, { strict: false });
  }

  async find() {
    return this.usersRepo.find({ relations: { profile: true } });
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const oldEmailUser = await this.usersRepo.findOne({
      where: { email: data.email },
    });
    if (oldEmailUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    const oldUsernameUser = await this.usersRepo.findOne({
      where: { username: data.username },
    });
    if (oldUsernameUser) {
      throw new BadRequestException('Username already in use');
    }
    const newUser = this.usersRepo.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    const newProfile = await this.profilesRepo.save({});
    newUser.profile = newProfile;
    const user = await this.usersRepo.save(newUser);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepo.findOne({
      where: { email },
      relations: {
        profile: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }
}
