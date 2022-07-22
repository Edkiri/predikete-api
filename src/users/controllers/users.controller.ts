import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { uuid } from 'uuidv4';
import { Request, Express } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';
import { UpdateProfileDto } from '../dtos/profile.dto';
import { ProfilesService } from '../services/profiles.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { IsProfileOwner } from '../guards/is-profile-owner.guard';
import { join } from 'path';

const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuid();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.find();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(+id);
  }

  @Public()
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @UseGuards(IsProfileOwner)
  @Post(':id/update-profile')
  @UseInterceptors(FileInterceptor('avatar', storage))
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    data.picture = file?.filename || null;
    return this.profilesService.update(+id, data);
  }

  @Public()
  @Get('profile-image/:imageName')
  findProfileImage(@Param('imageName') imageName, @Res() res) {
    return res.sendFile(
      join(process.cwd(), 'uploads/profileimages/' + imageName),
    );
  }
}
