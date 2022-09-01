import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PoolMatchDto {
  @IsNumber()
  @IsPositive()
  readonly poolMatchId!: number;

  @IsNumber()
  @IsPositive()
  readonly localId!: number;

  @IsNumber()
  @IsPositive()
  readonly visitId!: number;

  @IsNumber()
  @IsPositive()
  readonly goalsLocal!: number;

  @IsNumber()
  @IsPositive()
  readonly goalsVisit!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly penalsLocal?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly penalsVisit?: number;
}