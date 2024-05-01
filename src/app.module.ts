import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { NewModule } from './modules/news/new.module';
import { JobOfferModule } from './modules/jobs/job.module';
import { ForumModule } from './modules/forum/forum.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PrismaModule,
    UserModule,
    NewModule,
    JobOfferModule,
    ForumModule,
    CourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
