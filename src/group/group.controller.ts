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

import { PayloadToken } from 'src/auth/models/token.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import {
  GroupAccessRequestService,
  GroupInvitationService,
  MembershipService,
} from './services';
import {
  AcceptOrRejectDto,
  CreateGroupAccessRequestDto,
  CreateGroupDto,
  CreateGroupInvitationDto,
  GroupNotificationsDto,
} from './dto';
import {
  Group,
  GroupAccessRequest,
  GroupInvitation,
  Membership,
} from './entities';
import { IsGroupAdminGuard, IsInvitedUserGuard } from './guards';

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
// eslint-disable-next-line @darraghor/nestjs-typed/controllers-should-supply-api-tags
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
        .createGroupMembershipAndPool(data, sub);
    });
  }

  @ApiTags('group')
  @Get('my-groups')
  @ApiOkResponse({ type: Group, isArray: true })
  getUserGroups(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    return this.membershipService.findGroupsByUser(+sub);
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
    const membership = await this.dataSource.transaction((manager) => {
      return this.invitationService
        .withTransaction(manager)
        .useInvitation(+invitationId, data);
    });
    if (membership) return membership;
    return {
      message: 'Invitation have been rejected.',
    };
  }

  @ApiTags('group access_request operations')
  @Post(':groupId/use-access-request/:accessRequestId')
  @UseGuards(IsGroupAdminGuard)
  @ApiOkResponse({ status: 200 })
  @HttpCode(200)
  async useGroupAccessRequest(
    @Param('accessRequestId') accessRequestId: number,
    @Param('groupId') groupId: number,
    @Body() data: AcceptOrRejectDto,
  ) {
    const membership = await this.dataSource.transaction((manager) => {
      return this.AccessRequestService.withTransaction(
        manager,
      ).useAccessRequest(+accessRequestId, data);
    });
    if (membership) return membership;
    return {
      message: 'Access Request have been rejected.',
    };
  }

  @ApiTags('group')
  @Get('notifications')
  @ApiOkResponse({ type: () => GroupNotificationsDto })
  async getGroupNotifications(@Req() req: Request) {
    const { sub } = req.user as PayloadToken;
    const invitations = await this.invitationService.findUserInvitations(+sub);
    const accessRequests =
      await this.AccessRequestService.findUserAccessRequest(+sub);
    return { invitations, accessRequests };
  }
}
