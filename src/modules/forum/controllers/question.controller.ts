import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, ForumQuestion as ForumQuestionModel } from '@prisma/client';

import { ForumQuestionDto } from '../dto/question.dto';
import { ForumQuestionService } from '../services/question.service';
import { JwtAuthGuard } from 'src/modules/auth/config/jwt-auth.guard';

@Controller('forum/questions')
export class ForumQuestionController {
  constructor(private readonly forumQuestionService: ForumQuestionService) {}

  @Get()
  async getAllForumQuestions(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.forumQuestionService.getAllForumQuestions({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':question_id')
  async getForumQuestion(@Param('question_id') question_id: string) {
    return this.forumQuestionService.getForumQuestion({
      question_id: question_id,
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createForumQuestion(
    @Body() createForumQuestionDto: ForumQuestionDto,
  ): Promise<ForumQuestionModel> {
    const data: Prisma.ForumQuestionCreateInput = {
      question_text: createForumQuestionDto.question_text,
      question_title: createForumQuestionDto.question_title,
      user: { connect: { user_id: createForumQuestionDto.user_id } },
    };
    return this.forumQuestionService.createForumQuestion(data);
  }

  @Put(':question_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateForumQuestion(
    @Param('question_id') question_id: string,
    @Body() forumQuestionData: ForumQuestionModel,
  ): Promise<ForumQuestionModel> {
    return this.forumQuestionService.updateForumQuestion({
      where: { question_id: question_id },
      data: forumQuestionData,
    });
  }
}
