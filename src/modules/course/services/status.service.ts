import { Injectable, Logger } from '@nestjs/common';
import { Prisma, CourseStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CourseStatusService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('CourseStatus service');

  async getCourseStatus(
    courseStatusWhereUniqueInput: Prisma.CourseStatusWhereUniqueInput,
  ): Promise<CourseStatus | null> {
    this.logger.log('courseStatusById');
    const courseStatus = await this.prisma.courseStatus.findUnique({
      where: courseStatusWhereUniqueInput,
    });
    return courseStatus;
  }

  async getAllCourseStatuses() {
    this.logger.log('getAllCourseStatuses');
    const data = await this.prisma.courseStatus.findMany();

    return {
      data,
    };
  }

  async createCourseStatus(
    data: Prisma.CourseStatusCreateInput,
  ): Promise<CourseStatus> {
    this.logger.log('createCourseStatus');
    const createCourseStatus = await this.prisma.courseStatus.create({
      data,
    });

    return createCourseStatus;
  }

  async updateCourseStatus(params: {
    where: Prisma.CourseStatusWhereUniqueInput;
    data: Prisma.CourseStatusUpdateInput;
  }): Promise<CourseStatus> {
    this.logger.log('updateCourseStatus');
    const updateCourseStatus = await this.prisma.courseStatus.update({
      where: params.where,
      data: params.data,
    });
    return updateCourseStatus;
  }
}
