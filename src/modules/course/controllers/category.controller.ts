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
import { CourseCategory as CourseCategoryModel } from '@prisma/client';

import { CourseCategoryDto } from '../dto/category.dto';
import { CourseCategoryService } from '../services/category.service';

@Controller('courses/categories/')
export class CourseCategoryController {
  constructor(private readonly courseStatusService: CourseCategoryService) {}

  @Get()
  async getAllCourseCategories() {
    return this.courseStatusService.getAllCourseCategories();
  }

  @Get(':category_id')
  async getCourseCategory(@Param('category_id') category_id: number) {
    return this.courseStatusService.getCourseCategory({
      category_id: category_id,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCourseCategory(
    @Body() createCourseCategoryDto: CourseCategoryDto,
  ): Promise<CourseCategoryModel> {
    return this.courseStatusService.createCourseCategory(
      createCourseCategoryDto,
    );
  }

  @Put(':category_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCourseCategory(
    @Param('category_id') category_id: number,
    @Body() courseStatusData: { category_name: string },
  ): Promise<CourseCategoryModel> {
    return this.courseStatusService.updateCourseCategory({
      where: { category_id: category_id },
      data: courseStatusData,
    });
  }
}
