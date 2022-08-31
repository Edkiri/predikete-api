import { ApiProperty } from '@nestjs/swagger';
import { GroupAccessRequest } from 'src/group/entities/group-access-request.entity';
import { GroupInvitation } from '../entities/group-invitation.entity';

export class GroupNotificationsDto {
  @ApiProperty({ type: () => GroupInvitation, isArray: true })
  groupInvitations!: GroupInvitation[];

  @ApiProperty({ type: () => GroupAccessRequest, isArray: true })
  groupAccessRequests!: GroupAccessRequest[];
}
