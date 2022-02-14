import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTournamentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsBoolean()
  @IsOptional()
  readonly isFinished: boolean;
}

export class UpdateTournamentDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsBoolean()
  readonly isFinished: boolean;
}
