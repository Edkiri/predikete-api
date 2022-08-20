import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNotDefined } from 'src/tools';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';
import { Profile } from './model/profile.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (isNotDefined(user)) {
      throw new HttpException('Not found user with this email', 404);
    }
    return user;
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (isNotDefined(user)) {
      throw new HttpException(`Not found user with id "${userId}"`, 404);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const oldEmailUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (oldEmailUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    const oldUsernameUser = await this.userRepository.findOne({
      where: { username: data.username },
    });
    if (oldUsernameUser) {
      throw new BadRequestException('Username already in use');
    }
    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    const profile = await this.profileRepository.save({});
    newUser.profile = profile;
    return await this.userRepository.save(newUser);
  }
}
