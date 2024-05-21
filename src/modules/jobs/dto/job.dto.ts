import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class JobOfferDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(2040)
  offer_text: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  offer_title: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  city_id: string;
}
