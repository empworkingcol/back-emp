import { Injectable, Logger } from '@nestjs/common';
import { Prisma, ForumQuestion } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { ResForumQuestionDto } from '../dto/res-question.dto';

@Injectable()
export class ForumQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('ForumQuestion service');

  async getForumQuestion(
    forumQuestionWhereUniqueInput: Prisma.ForumQuestionWhereUniqueInput,
  ): Promise<ResForumQuestionDto | null> {
    this.logger.log('forumQuestionById');
    const forumQuestion = await this.prisma.forumQuestion.findUnique({
      where: forumQuestionWhereUniqueInput,
      select: {
        question_id: true,
        question_text: true,
        question_title: true,
        user: {
          select: {
            user_name: true,
          },
        },
        ForumResponse: {
          select: {
            response_text: true,
            creation_date: true,
            user: {
              select: {
                user_name: true,
              },
            },
          },
        },
        creation_date: true,
      },
    });
    return forumQuestion;
  }

  async getAllForumQuestions({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllForumQuestions');
    const data = await this.prisma.forumQuestion.findMany({
      skip: skip,
      take: limit,
      select: {
        question_id: true,
        question_title: true,
        user: {
          select: {
            user_name: true,
          },
        },
        creation_date: true,
      },
    });
    const total = await this.prisma.forumQuestion.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createForumQuestion(
    data: Prisma.ForumQuestionCreateInput,
  ): Promise<ForumQuestion> {
    this.logger.log('createForumQuestion');
    const createForumQuestion = await this.prisma.forumQuestion.create({
      data,
    });

    return createForumQuestion;
  }

  async updateForumQuestion(params: {
    where: Prisma.ForumQuestionWhereUniqueInput;
    data: Prisma.ForumQuestionUpdateInput;
  }): Promise<ForumQuestion> {
    this.logger.log('updateForumQuestion');
    const updateForumQuestion = await this.prisma.forumQuestion.update({
      where: params.where,
      data: params.data,
    });
    return updateForumQuestion;
  }
}
