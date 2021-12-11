import { IsOptional, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Length(4, 255)
  name: string;

  @IsOptional()
  @IsString()
  about: string;
}
