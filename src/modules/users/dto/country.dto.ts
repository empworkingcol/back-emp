import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  country_name: string;
}
