import {
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
  MinLength,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @Length(4, 255)
  name: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  picture: string;
}

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @Length(4, 255)
  name: string;

  @IsOptional()
  @IsString()
  about: string;

  @IsOptional()
  @IsString()
  picture: string;
}

export class FindGorupByNameDto {
  @IsString()
  @MinLength(2)
  groupName: string;

  @IsOptional()
  @IsPositive()
  take: number;

  @IsOptional()
  @Min(0)
  skip: number;
}

export class FindGroupsByUserDto {
  @IsOptional()
  @IsPositive()
  take: number;

  @IsOptional()
  @Min(0)
  skip: number;
}
