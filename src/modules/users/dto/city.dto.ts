import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  city_name: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  country_id: string;
}
