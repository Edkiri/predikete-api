import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from 'src/group/group.module';
import { UserModule } from 'src/user/user.module';
import { GroupAccessRequest } from './entities/group-access-request.entity';
import { GroupInvitation } from './entities/group-invitation.entity';
import { Membership } from './entities/membership.entity';
import { GroupAccessRequestService } from './services/group-access-request.service';
import { GroupInvitationService } from './services/group-invitation.service';
import { MembershipService } from './membership.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membership, GroupAccessRequest, GroupInvitation]),
    GroupModule,
    UserModule,
  ],
  providers: [
    MembershipService,
    GroupInvitationService,
    GroupAccessRequestService,
  ],
  exports: [MembershipService],
})
export class MembershipModule {}
