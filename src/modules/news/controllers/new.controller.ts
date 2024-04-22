import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, New as NewModel } from '@prisma/client';

import { NewDto } from '../dto/new.dto';
import { NewService } from '../services/new.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get()
  async getAllNews(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.newService.getAllNews({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':new_id')
  async getNew(@Param('new_id') new_id: string) {
    return this.newService.getNew({ new_id: new_id });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async createNew(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() createNewDto: NewDto,
  ): Promise<NewModel> {
    const imageUrl = await file.location;

    const data: Prisma.NewCreateInput = {
      new_text: createNewDto.new_text,
      new_title: createNewDto.new_title,
      img_url: imageUrl,
      user: { connect: { user_id: createNewDto.user_id } },
    };
    return this.newService.createNew(data);
  }

  @Put(':new_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateNew(
    @Param('new_id') new_id: string,
    @Body() newData: NewDto,
  ): Promise<NewModel> {
    return this.newService.updateNew({
      where: { new_id: new_id },
      data: newData,
    });
  }
}
