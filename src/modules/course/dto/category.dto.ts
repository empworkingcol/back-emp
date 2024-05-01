import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CourseCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  category_name: string;
}
