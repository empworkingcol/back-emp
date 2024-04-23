import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewCommentDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  comment_text: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  new_id: string;
}
