import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class TestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  question: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  option_1: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  option_2: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  option_3: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  option_4: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  position: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  correct_answer: string;
}
