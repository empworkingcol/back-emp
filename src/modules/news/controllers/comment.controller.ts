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
import { Prisma, NewComment as NewCommentModel } from '@prisma/client';
import { NewCommentDto } from '../dto/comment.dto';
import { NewCommentService } from '../services/comment.service';
import { JwtAuthGuard } from 'src/modules/auth/config/jwt-auth.guard';

@Controller('news/comments')
export class NewCommentController {
  constructor(private readonly newCommentService: NewCommentService) {}

  @Get()
  async getAllNewComments(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.newCommentService.getAllComments({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async createNewComment(
    @Body() createNewCommentDto: NewCommentDto,
  ): Promise<NewCommentModel> {
    const data: Prisma.NewCommentCreateInput = {
      comment_text: createNewCommentDto.comment_text,
      new: { connect: { new_id: createNewCommentDto.new_id } },
      user: { connect: { user_id: createNewCommentDto.user_id } },
    };
    return this.newCommentService.createComment(data);
  }

  @Put(':comment_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateNewComment(
    @Param('comment_id') comment_id: string,
    @Body() newCommentData: NewCommentDto,
  ): Promise<NewCommentModel> {
    return this.newCommentService.updateComment({
      where: { comment_id: comment_id },
      data: newCommentData,
    });
  }
}
