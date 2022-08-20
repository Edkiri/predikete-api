import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from 'src/user/model/user.model';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LoginDto } from '../dto/login-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({ type: LoginResponseDto })
  login(@Req() req: Request, @Body() loginDto: LoginDto) {
    console.log(loginDto);
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
