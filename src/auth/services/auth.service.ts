import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/model/user.model';
import { PayloadToken } from '../models/token.model';
import { LoginResponseDto } from '../dto/login-response.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  generateJWT(user: User): LoginResponseDto {
    const payload: PayloadToken = { sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { notBefore: '7d' }),
      user,
    };
  }
}
