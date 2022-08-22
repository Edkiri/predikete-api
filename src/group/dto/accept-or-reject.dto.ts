import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AcceptOrRejectDto {
  @IsBoolean()
  @ApiProperty()
  accept!: boolean;
}
