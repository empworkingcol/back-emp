import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class LikeNewDto {
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
