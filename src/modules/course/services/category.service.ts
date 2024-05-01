import { Injectable, Logger } from '@nestjs/common';
import { Prisma, CourseCategory } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CourseCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('CourseCategory service');

  async getCourseCategory(
    courseCategoryWhereUniqueInput: Prisma.CourseCategoryWhereUniqueInput,
  ): Promise<CourseCategory | null> {
    this.logger.log('courseCategoryById');
    const courseCategory = await this.prisma.courseCategory.findUnique({
      where: courseCategoryWhereUniqueInput,
    });
    return courseCategory;
  }

  async getAllCourseCategories() {
    this.logger.log('getAllCourseCategories');
    const data = await this.prisma.courseCategory.findMany();

    return {
      data,
    };
  }

  async createCourseCategory(
    data: Prisma.CourseCategoryCreateInput,
  ): Promise<CourseCategory> {
    this.logger.log('createCourseCategory');
    const createCourseCategory = await this.prisma.courseCategory.create({
      data,
    });

    return createCourseCategory;
  }

  async updateCourseCategory(params: {
    where: Prisma.CourseCategoryWhereUniqueInput;
    data: Prisma.CourseCategoryUpdateInput;
  }): Promise<CourseCategory> {
    this.logger.log('updateCourseCategory');
    const updateCourseCategory = await this.prisma.courseCategory.update({
      where: params.where,
      data: params.data,
    });
    return updateCourseCategory;
  }
}
