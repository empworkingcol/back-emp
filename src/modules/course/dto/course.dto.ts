import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CourseVideoDto } from './video.dto';
import { Type } from 'class-transformer';
import { TestDto } from './test.dto';

export enum EventStatus {
  ONSITE = 'ONSITE',
  ONLINE = 'ONLINE',
}

export class CourseDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  course_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(2040)
  course_description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @IsEnum(EventStatus)
  course_type: EventStatus;

  @IsNotEmpty()
  @IsInt()
  category_id: number;

  @IsNotEmpty()
  course_date: string;

  @IsNotEmpty()
  @IsInt()
  total_steps: number;

  @IsString()
  @MaxLength(255)
  img_url: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CourseVideoDto)
  videos: CourseVideoDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TestDto)
  tests: TestDto[];
}
