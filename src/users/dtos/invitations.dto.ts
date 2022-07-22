import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsOptional()
  @IsString()
  message: string;

  @IsEmail()
  email: string;
}

export class UseInvitationDto {
  @IsBoolean()
  accept: boolean;
}
