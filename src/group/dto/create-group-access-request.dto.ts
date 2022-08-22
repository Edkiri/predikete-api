import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGroupAccessRequestDto {
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  message?: string;
}
