import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, ForumResponse as ForumResponseModel } from '@prisma/client';

import { ForumResponseDto } from '../dto/response.dto';
import { ForumResponseService } from '../services/response.service';

@Controller('forum/responses')
export class ForumResponseController {
  constructor(private readonly forumResponseService: ForumResponseService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createForumResponse(
    @Body() createForumResponseDto: ForumResponseDto,
  ): Promise<ForumResponseModel> {
    const data: Prisma.ForumResponseCreateInput = {
      response_text: createForumResponseDto.response_text,
      user: { connect: { user_id: createForumResponseDto.user_id } },
    };
    return this.forumResponseService.createForumResponse(data);
  }

  @Put(':response_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateForumResponse(
    @Param('response_id') response_id: string,
    @Body() forumResponseData: ForumResponseModel,
  ): Promise<ForumResponseModel> {
    return this.forumResponseService.updateForumResponse({
      where: { response_id: response_id },
      data: forumResponseData,
    });
  }
}
