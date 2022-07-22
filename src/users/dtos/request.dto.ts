import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsOptional()
  @IsString()
  message?: string;
}

export class UseRequestDto {
  @IsBoolean()
  accept: boolean;
}
