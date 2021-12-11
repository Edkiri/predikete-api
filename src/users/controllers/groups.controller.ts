import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { CreateGroupDto } from '../dtos/group.dto';
import { AddMemberDto } from '../dtos/membership.dto';
import { GroupsService } from '../services/groups.service';
import { InvitationsService } from '../services/invitations.service';
import { MembershipsService } from '../services/memberships.service';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly groupsService: GroupsService,
    private readonly membershipsService: MembershipsService,
  ) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.findOne(+id);
  }

  @Post()
  createGroup(@Req() req: Request, @Body() data: CreateGroupDto) {
    const user = req.user as PayloadToken;
    return this.groupsService.create(user, data);
  }

  @Get(':id/my-invitations')
  getInvitationsList(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = req.user as PayloadToken;
    return this.invitationsService.getUserInvitations(user, +id);
  }

  @Post(':id/members')
  addMemberFromInvitationCode(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddMemberDto,
  ) {
    const user = req.user as PayloadToken;
    return this.membershipsService.createByInvitationCode(user, +id, data);
  }
}
