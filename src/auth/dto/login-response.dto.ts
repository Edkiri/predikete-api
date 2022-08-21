import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { User } from 'src/user/entities/user.entity';

import * as dotenv from 'dotenv';
dotenv.config();

export class LoginResponseDto {
  constructor({ access_token, user }: LoginResponseDto) {
    this.access_token = access_token;
    this.user = user;
  }

  @ApiProperty({
    description: `Valid for only ${process.env.JWT_VALID_DAYS} days.`,
  })
  access_token!: string;

  @ApiModelProperty({ type: () => User })
  user!: User;
}
