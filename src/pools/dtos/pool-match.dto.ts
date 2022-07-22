import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PoolMatchDto {
  @IsNumber()
  @IsPositive()
  readonly poolMatchId: number;

  @IsOptional()
  @IsPositive()
  readonly localId: number;

  @IsOptional()
  @IsPositive()
  readonly visitId: number;

  @IsOptional()
  @IsNumber()
  readonly goalsLocal: number;

  @IsOptional()
  @IsNumber()
  readonly goalsVisit: number;

  @IsOptional()
  @IsNumber()
  readonly penalsLocal: number;

  @IsOptional()
  @IsNumber()
  readonly penalsVisit: number;
}

export class UpdatePoolMatchDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PoolMatchDto)
  poolMatches: PoolMatchDto[];
}
