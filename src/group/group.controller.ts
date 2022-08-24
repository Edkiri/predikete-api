import path from 'path';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { uuid } from 'uuidv4';

import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { PayloadToken } from 'src/auth/models/token.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MembershipService } from 'src/membership/membership.service';
import { Membership } from '../membership/entities/membership.entity';
import { GroupInvitationService } from '../membership/services/group-invitation.service';
import { GroupInvitation } from 'src/membership/entities/group-invitation.entity';
import { CreateGroupInvitationDto } from './dto/create-invitation.dto';
import { AcceptOrRejectDto } from './dto/accept-or-reject.dto';
import { GroupAccessRequest } from 'src/membership/entities/group-access-request.entity';
import { CreateGroupAccessRequestDto } from './dto/create-group-access-request.dto';
import { GroupAccessRequestService } from 'src/membership/services/group-access-request.service';
import { IsGroupAdminGuard } from './guards/is-group-admin.guard';
import { IsInvitedUserGuard } from './guards/is-invitation-owner.guard';
import { GroupNotificationsDto } from './dto/group-notification.dto';

// TODO: Must work with amazon s3 on production
const storage = {
  storage: diskStorage({
    destination: './uploads/groupimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@ApiBearerAuth()
@Controller('group')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(
    private readonly membershipService: MembershipService,
    private readonly invitationService: GroupInvitationService,
    private readonly AccessRequestService: GroupAccessRequestService,
    private readonly dataSource: DataSource,
  ) {}

  @ApiTags('group')
  @Post()
  @ApiOkResponse({ type: Group })
  @UseInterceptors(FileInterceptor('picture', storage))
  createGroup(
    @Req() req: Request,
    @Body() data: CreateGroupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { sub } = req.user as PayloadToken;
    data.picture = file?.filename || null;

    return this.dataSource.transaction((manager) => {
      return this.membershipService
        .withTransaction(manager)
        .createGroupAndMembership(data, sub);
    });
  }

  @ApiTags('group')
  @Get(':groupId/members')
  @ApiOkResponse({ type: Membership, isArray: true })
  getGroupMembers(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.membershipService.findGroupMembers(+groupId);
  }

  @ApiTags('group invite operations')
  @Post(':groupId/invite-user')
  @UseGuards(IsGroupAdminGuard)
  @HttpCode(201)
  @ApiOkResponse({ type: () => GroupInvitation, status: 201 })
  @ApiBody({ type: CreateGroupInvitationDto })
  createInvitation(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() data: CreateGroupInvitationDto,
    @Req() req: Request,
  ) {
    const { sub } = req.user as PayloadToken;
    return this.invitationService.createGroupInvitation(+sub, +groupId, data);
  }

  @ApiTags('group access_request operations')
  @Post(':groupId/access-request')
  @ApiOkResponse({ type: () => GroupAccessRequest, status: 204 })
  @ApiBody({ type: CreateGroupAccessRequestDto, required: false })
  createGroupAccessRequest(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() data: CreateGroupAccessRequestDto,
    @Req() req: Request,
  ) {
    const { sub } = req.user as PayloadToken;
    return this.AccessRequestService.create(+sub, groupId, data);
  }

  @ApiTags('group invite operations')
  @Post('use-invitation/:invitationId')
  @UseGuards(IsInvitedUserGuard)
  @ApiOkResponse({ status: 200 })
  @HttpCode(200)
  async useInvitation(
    @Param('invitationId', ParseIntPipe) invitationId: number,
    @Body() data: AcceptOrRejectDto,
  ) {
    await this.invitationService.useInvitation(+invitationId, data);
    const operation = data.accept ? 'accepted' : 'rejected';
    return {
      message: `Invitation successfully ${operation}`,
    };
  }

  @ApiTags('group access_request operations')
  @Post('use-access-request/:accessRequestId')
  @UseGuards(IsGroupAdminGuard)
  @ApiOkResponse({ status: 200 })
  @HttpCode(200)
  async useGroupAccessRequest(
    @Param('accessRequestId') accessRequestId: number,
    @Body() data: AcceptOrRejectDto,
  ) {
    await this.AccessRequestService.useAccessRequest(+accessRequestId, data);
  }

  @ApiTags('group')
  @Get('notifications')
  @ApiOkResponse({ type: () => GroupNotificationsDto })
  async getGroupNotifications(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    const invitations = await this.invitationService.findUserInvitations(+sub);
    const accessRequest = await this.AccessRequestService.findUserAccessRequest(
      +sub,
    );
    return { invitations, accessRequest };
  }
}
