import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateMatchDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly isFinished: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly isDefined: boolean;

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

  @IsOptional()
  @IsPositive()
  readonly localId: number;

  @IsOptional()
  @IsPositive()
  readonly visitId: number;
}
