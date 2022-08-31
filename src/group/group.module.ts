import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController } from './group.controller';
import {
  Group,
  GroupAccessRequest,
  GroupInvitation,
  Membership,
} from './entities';
import {
  GroupAccessRequestService,
  GroupInvitationService,
  GroupService,
  MembershipService,
} from './services';

import { UserModule } from 'src/user/user.module';
import { PoolModule } from 'src/pool/pool.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      Membership,
      GroupAccessRequest,
      GroupInvitation,
    ]),
    UserModule,
    forwardRef(() => PoolModule),
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    MembershipService,
    GroupAccessRequestService,
    GroupInvitationService,
  ],
  exports: [MembershipService],
})
export class GroupModule {}
