import { forwardRef, Module } from '@nestjs/common';
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
import { PoolsModule } from 'src/pools/pools.module';
import { Request } from './entities/request.entity';
import { InvitationsService } from './services/invitations.service';
import { RequestsService } from './services/requests.service';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Group,
      Membership,
      Invitation,
      Request,
    ]),
    forwardRef(() => PoolsModule),
  ],
  controllers: [UsersController, GroupsController, NotificationsController],
  providers: [
    UsersService,
    ProfilesService,
    InvitationsService,
    GroupsService,
    MembershipsService,
    RequestsService,
    NotificationsService,
  ],
  exports: [UsersService, MembershipsService],
})
export class UsersModule {}
