import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CourseVideoDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  video_url: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  position: number;
}
