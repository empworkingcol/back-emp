import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RolDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  rol_name: string;
}
