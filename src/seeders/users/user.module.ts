import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/users/entities/group.entity';
import { Membership } from 'src/users/entities/membership.entity';
import { Profile } from 'src/users/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { UserSeederService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Membership, Group])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
