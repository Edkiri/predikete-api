import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  description: string;
}
