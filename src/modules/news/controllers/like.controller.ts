import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, LikeNew as LikeNewModel } from '@prisma/client';
import { LikeNewDto } from '../dto/like.dto';
import { LikeNewService } from '../services/like.service';

@Controller('news/likes')
export class LikeNewController {
  constructor(private readonly likeService: LikeNewService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLikeNew(
    @Body() createLikeNewDto: LikeNewDto,
  ): Promise<LikeNewModel> {
    const data: Prisma.LikeNewCreateInput = {
      new: { connect: { new_id: createLikeNewDto.new_id } },
      user: { connect: { user_id: createLikeNewDto.user_id } },
    };
    return this.likeService.createLike(data);
  }
}
