import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Course, Course as CourseModel } from '@prisma/client';

import { CourseDto } from '../dto/course.dto';
import { CourseService } from '../services/course.service';
import { EnrollDto } from '../dto/enroll.dto';
import { RolesGuard } from 'src/modules/auth/config/roles.guard';
import { Roles } from 'src/modules/auth/config/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/config/jwt-auth.guard';

@Controller('courses/')
@UseGuards(RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':course_id')
  async getCourse(@Param('course_id') course_id: string) {
    return this.courseService.getCourse({ course_id: course_id });
  }

  @Post('/enroll')
  @UsePipes(new ValidationPipe({ transform: true }))
  async enrollStudent(@Body() createEnrollDto: EnrollDto): Promise<string> {
    return this.courseService.enrollUser(createEnrollDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('SPR', 'ADM')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCourse(@Body() createCourseDto: CourseDto): Promise<CourseModel> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Put(':course_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCourse(
    @Param('course_id') course_id: string,
    @Body() courseData: Course,
  ): Promise<CourseModel> {
    return this.courseService.updateCourse({
      where: { course_id: course_id },
      data: courseData,
    });
  }
}
