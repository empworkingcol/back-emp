import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class EnrollDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  user_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @MaxLength(50)
  course_id: string;
}
