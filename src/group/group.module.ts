import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { GroupController } from './group.controller';
import { GroupService } from './services/group.service';
import { MembershipService } from './services/membership.service';
import { Group } from './entities/group.entity';
import { Membership } from './entities/membership.entity';
import { GroupInvitationService } from './services/group-invitation.service';
import { GroupInvitation } from './entities/group-invitation.entity';
import { GroupAccessRequest } from './entities/group-access-request.entity';
import { GroupAccessRequestService } from './services/group-access-request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Group,
      Membership,
      GroupInvitation,
      GroupAccessRequest,
    ]),
    UserModule,
  ],
  controllers: [GroupController],
  providers: [
    GroupService,
    MembershipService,
    GroupInvitationService,
    GroupAccessRequestService,
  ],
  exports: [],
})
export class GroupModule {}
