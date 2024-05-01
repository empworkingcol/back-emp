import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Video } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Video service');

  async getAllVideos() {
    this.logger.log('getAllVideos');
    const data = await this.prisma.video.findMany();

    return {
      data,
    };
  }

  async createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
    this.logger.log('createVideo');
    const createVideo = await this.prisma.video.create({
      data,
    });

    return createVideo;
  }

  async updateVideo(params: {
    where: Prisma.VideoWhereUniqueInput;
    data: Prisma.VideoUpdateInput;
  }): Promise<Video> {
    this.logger.log('updateVideo');
    const updateVideo = await this.prisma.video.update({
      where: params.where,
      data: params.data,
    });
    return updateVideo;
  }
}
