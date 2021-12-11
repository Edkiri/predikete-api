import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/user.dto';
import { UpdateProfileDto } from '../dtos/profile.dto';
import { ProfilesService } from '../services/profiles.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

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

  @Put(':id/update-profile')
  updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateProfileDto,
  ) {
    return this.profilesService.update(+id, data);
  }
}
