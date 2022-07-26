import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/users/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/users/models/role.model';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @InjectRepository(Profile)
    private readonly profilesRepo: Repository<Profile>,
  ) {}

  async createAdmin(): Promise<User> | null {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const oldUser = await this.usersRepo.findOne({ username: adminUsername });
    if (oldUser)
      throw new Error(
        `Error creating admin user - A user with username ${adminUsername} already exists`,
      );
    const newUser = this.usersRepo.create({
      username: adminUsername,
      email: adminEmail,
      password: adminPassword,
      role: Role.ADMIN,
    });
    const hashPassword = await bcrypt.hash(adminPassword, 10);
    newUser.password = hashPassword;
    const newProfile = await this.profilesRepo.save({});
    newUser.profile = newProfile;
    return this.usersRepo.save(newUser);
  }
}
