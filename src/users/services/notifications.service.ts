import { Injectable } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { RequestsService } from './requests.service';
import { UsersService } from './users.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly invitationsService: InvitationsService,
    private readonly requestsService: RequestsService,
  ) {}

  async findByUser(userId: number) {
    const user = await this.usersService.findOne(userId);
    const invitations = await this.invitationsService.findByUser(user);
    const requests = await this.requestsService.findByAdmin(user);
    return {
      invitations: [...invitations],
      requests: [...requests],
    };
  }
}
