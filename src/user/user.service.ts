import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNotDefined } from 'src/tools';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Profile } from './entities/profile.entity';
import { Role } from './entities/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (isNotDefined(user)) {
      throw new HttpException(`Not found user with id "${userId}"`, 404);
    }
    return user;
  }

  async create(data: CreateUserDto, role = Role.CLIENT) {
    const oldEmailUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (oldEmailUser) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }
    // TODO: Find a better way to do this
    const newUser = this.userRepository.create(data);
    const hashPassword = await bcrypt.hash(data.password, 10);
    newUser.password = hashPassword;
    const profile = await this.profileRepository.save({});
    newUser.profile = profile;
    newUser.role = role;
    const user = await this.userRepository.save(newUser);
    return this.userRepository.findOneOrFail({ where: { id: user.id } });
  }
}
