import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './services/profiles.service';
import { GroupsController } from './controllers/groups.controller';
import { Group } from './entities/group.entity';
import { Membership } from './entities/membership.entity';
import { GroupsService } from './services/groups.service';
import { MembershipsService } from './services/memberships.service';
import { Invitation } from './entities/invitation.entity';
import { InvitationsService } from './services/invitations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Group, Membership, Invitation]),
  ],
  controllers: [UsersController, GroupsController],
  providers: [
    UsersService,
    ProfilesService,
    GroupsService,
    MembershipsService,
    InvitationsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
