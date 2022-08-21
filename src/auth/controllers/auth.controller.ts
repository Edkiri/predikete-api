import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/entities/user.entity';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login-dto';

// TODO: How to use a injected provider inside a decorator?
import * as dotenv from 'dotenv';
dotenv.config();

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: LoginResponseDto,
    // TODO: How to use a injected provider inside a decorator?
    description: `'access_token' only valid for ${process.env.JWT_VALID_DAYS} days`,
  })
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
