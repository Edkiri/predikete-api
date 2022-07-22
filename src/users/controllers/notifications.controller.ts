import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { IsInvitedUserGuard } from '../guards/is-invited-user.guard';
import { InvitationsService } from '../services/invitations.service';
import { NotificationsService } from '../services/notifications.service';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly invitationsService: InvitationsService,
  ) {}

  @Get()
  getUserNotifications(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.notificationsService.findByUser(user.sub);
  }

  @UseGuards(IsInvitedUserGuard)
  @Get('invitation/:invitationId')
  getInvitationDetail(
    @Param('invitationId', ParseIntPipe) invitationId: number,
  ) {
    return this.invitationsService.findOne(invitationId);
  }
}
