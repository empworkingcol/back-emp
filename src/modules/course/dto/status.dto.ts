import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CourseStatusDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  status_name: string;
}
