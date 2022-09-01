import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotContains,
  IsArray,
} from 'class-validator';
import { PoolMatchDto } from './pool-match.dto';

export class UpdatePoolMatchesDto {
  @Type(() => PoolMatchDto)
  @IsArray()
  @ArrayMinSize(64)
  @ArrayMaxSize(64)
  @ArrayNotContains([null, undefined])
  poolMatches!: PoolMatchDto[];
}
