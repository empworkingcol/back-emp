import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  new_title: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2040)
  new_text: string;
}
