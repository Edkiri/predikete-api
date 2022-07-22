import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Express } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import path = require('path');
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { uuid } from 'uuidv4';
import {
  CreateGroupDto,
  FindGorupByNameDto,
  FindGroupsByUserDto,
  UpdateGroupDto,
} from '../dtos/group.dto';
import { CreateInvitationDto, UseInvitationDto } from '../dtos/invitations.dto';
import { CreateRequestDto, UseRequestDto } from '../dtos/request.dto';
import { IsGroupAdminGuard } from '../guards/is-group-admin.guard';
import { IsInvitedUserGuard } from '../guards/is-invited-user.guard';
import { GroupsService } from '../services/groups.service';
import { InvitationsService } from '../services/invitations.service';
import { MembershipsService } from '../services/memberships.service';
import { RequestsService } from '../services/requests.service';

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

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly invitationsService: InvitationsService,
    private readonly groupsService: GroupsService,
    private readonly requestsService: RequestsService,
    private readonly membershipsService: MembershipsService,
  ) {}

  @Get('find-by-name')
  findByName(@Query() params: FindGorupByNameDto) {
    return this.groupsService.findByName(params);
  }

  @Get(':groupId')
  getOne(@Param('groupId', ParseIntPipe) groupId: number) {
    return this.groupsService.findOne(+groupId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('picture', storage))
  createGroup(
    @Req() req: Request,
    @Body() data: CreateGroupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req.user as PayloadToken;
    data.picture = file?.filename || null;
    return this.groupsService.create(user, data);
  }

  @Get()
  getUserGroups(@Req() req: Request, @Query() params: FindGroupsByUserDto) {
    const user = req.user as PayloadToken;
    return this.membershipsService.findByUser(user.sub, params);
  }

  @Public()
  @Get('group-image/:imageName')
  findProfileImage(@Param('imageName') imageName, @Res() res) {
    return res.sendFile(
      join(process.cwd(), 'uploads/groupimages/' + imageName),
    );
  }

  @UseGuards(IsGroupAdminGuard)
  @Put(':groupId')
  @UseInterceptors(FileInterceptor('picture', storage))
  updateGroupInfo(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() data: UpdateGroupDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.picture = file?.filename || null;
    return this.groupsService.update(groupId, data);
  }

  @UseGuards(IsGroupAdminGuard)
  @Post(':groupId/invite-user')
  createUserInvitation(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() data: CreateInvitationDto,
  ) {
    const user = req.user as PayloadToken;
    return this.invitationsService.create(user, groupId, data);
  }

  @Post(':groupId/request-join')
  createGroupJoinRequest(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
    @Body() data: CreateRequestDto,
  ) {
    const user = req.user as PayloadToken;
    return this.requestsService.create(user.sub, groupId, data);
  }

  @Get(':groupId/membership-status')
  async membershipStatus(
    @Req() req: Request,
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    const user = req.user as PayloadToken;
    const isMember = await this.groupsService.isMember(groupId, user.sub);
    const request =
      (await this.requestsService.findByGroupAndUser(groupId, user.sub)) ||
      null;
    return { isMember, request };
  }

  @UseGuards(IsInvitedUserGuard)
  @Post(':groupId/invitations/:invitationId')
  useInvitations(
    @Req() req: Request,
    @Param('invitationId', ParseIntPipe) invitationId: number,
    @Body() data: UseInvitationDto,
  ) {
    const user = req.user as PayloadToken;
    return this.invitationsService.useInvitation(invitationId, user.sub, data);
  }

  @UseGuards(IsGroupAdminGuard)
  @Post(':groupId/requests/:requestId')
  useRequest(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Body() data: UseRequestDto,
  ) {
    return this.requestsService.useRequest(requestId, data);
  }

  @Get('/requests/:requestId')
  findRequest(@Param('requestId', ParseIntPipe) requestId: number) {
    return this.requestsService.findOne(requestId);
  }
}
