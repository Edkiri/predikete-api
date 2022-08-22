import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGroupInvitationDto {
  @ApiProperty()
  @IsNumber()
  sentToUserId!: number;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(255)
  @IsOptional()
  message?: string;
}
