import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CourseStatus as CourseStatusModel } from '@prisma/client';

import { CourseStatusDto } from '../dto/status.dto';
import { CourseStatusService } from '../services/status.service';

@Controller('courses/statuses/')
export class CourseStatusController {
  constructor(private readonly courseStatusService: CourseStatusService) {}

  @Get()
  async getAllCourseStatuses() {
    return this.courseStatusService.getAllCourseStatuses();
  }

  @Get(':status_id')
  async getCourseStatus(@Param('status_id') status_id: number) {
    return this.courseStatusService.getCourseStatus({ status_id: status_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCourseStatus(
    @Body() createCourseStatusDto: CourseStatusDto,
  ): Promise<CourseStatusModel> {
    return this.courseStatusService.createCourseStatus(createCourseStatusDto);
  }

  @Put(':status_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCourseStatus(
    @Param('status_id') status_id: number,
    @Body() courseStatusData: { status_name: string },
  ): Promise<CourseStatusModel> {
    return this.courseStatusService.updateCourseStatus({
      where: { status_id: status_id },
      data: courseStatusData,
    });
  }
}
