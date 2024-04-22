import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { PrismaModule } from '../prisma/prisma.module';
import { NewController } from './controllers/new.controller';
import { MulterConfigService } from 'src/common/services/multer.config.service';
import { NewService } from './services/new.service';

@Module({
  imports: [
    PrismaModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [NewController],
  providers: [NewService],
})
export class NewModule {}
