import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { CourseCategoryService } from './services/category.service';
import { VideoService } from './services/video.service';
import { TestService } from './services/test.service';
import { CourseStatusService } from './services/status.service';
import { CourseService } from './services/course.service';
import { CourseCategoryController } from './controllers/category.controller';
import { CourseController } from './controllers/course.controller';
import { CourseStatusController } from './controllers/status.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    CourseCategoryController,
    CourseStatusController,
    CourseController,
  ],
  providers: [
    CourseCategoryService,
    VideoService,
    TestService,
    CourseStatusService,
    CourseService,
  ],
})
export class CourseModule {}
