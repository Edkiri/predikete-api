import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotContains,
  IsArray,
} from 'class-validator';
import { PoolMatch } from '../entities';

export class UpdatePoolMatchesDto {
  @Type(() => PoolMatch)
  @IsArray()
  @ArrayMinSize(64)
  @ArrayMaxSize(64)
  @ArrayNotContains([null, undefined])
  poolMatches!: PoolMatch[];
}
