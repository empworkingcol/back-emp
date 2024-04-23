import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaModule } from '../prisma/prisma.module';
import { NewController } from './controllers/new.controller';
import { MulterConfigService } from 'src/common/services/multer.config.service';
import { NewService } from './services/new.service';
import { NewCommentController } from './controllers/comment.controller';
import { LikeNewController } from './controllers/like.controller';
import { NewCommentService } from './services/comment.service';
import { LikeNewService } from './services/like.service';

@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [NewController, NewCommentController, LikeNewController],
  providers: [NewService, NewCommentService, LikeNewService],
})
export class NewModule {}
