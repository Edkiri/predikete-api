import { ApiProperty } from '@nestjs/swagger';
import { GroupAccessRequest } from 'src/membership/entities/group-access-request.entity';
import { GroupInvitation } from 'src/membership/entities/group-invitation.entity';

export class GroupNotificationsDto {
  @ApiProperty({ type: () => GroupInvitation, isArray: true })
  groupInvitations!: GroupInvitation[];

  @ApiProperty({ type: () => GroupAccessRequest, isArray: true })
  groupAccessRequests!: GroupAccessRequest[];
}
