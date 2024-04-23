import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CountryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  country_name: string;
}
