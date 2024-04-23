import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ForumResponseController } from './controllers/response.controller';
import { ForumQuestionController } from './controllers/question.controller';
import { ForumQuestionService } from './services/question.service';
import { ForumResponseService } from './services/response.service';

@Module({
  imports: [PrismaModule],
  controllers: [ForumResponseController, ForumQuestionController],
  providers: [ForumQuestionService, ForumResponseService],
})
export class ForumModule {}
