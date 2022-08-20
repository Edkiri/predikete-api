import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  password!: string;
}
