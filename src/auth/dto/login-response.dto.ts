import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { User } from 'src/user/model/user.model';

export class LoginResponseDto {
  constructor({ access_token, user }: LoginResponseDto) {
    this.access_token = access_token;
    this.user = user;
  }

  @ApiModelProperty({ description: 'Valid for 7d. No refresh.' })
  access_token!: string;

  @ApiModelProperty({ type: () => User })
  user!: User;
}
