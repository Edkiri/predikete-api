import path from 'path';
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { uuid } from 'uuidv4';

import { Group } from './model/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { PayloadToken } from 'src/auth/models/token.model';
import { GroupService } from './group.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MembershipService } from './membership.service';

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

@Controller('group')
@ApiTags('group')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly membershipService: MembershipService,
    private readonly dataSource: DataSource,
  ) {}

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
}
