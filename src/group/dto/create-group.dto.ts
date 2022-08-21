import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Length(4, 20)
  @ApiProperty()
  name!: string;

  @IsOptional()
  @IsString()
  @Length(4, 100)
  @ApiPropertyOptional()
  about?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  picture?: string;
}
