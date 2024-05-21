import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ForumQuestionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(2040)
  question_text: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  question_title: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  user_id: string;
}
