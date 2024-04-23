import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { JobOfferController } from './controllers/job.controller';
import { JobOfferService } from './services/job.service';

@Module({
  imports: [PrismaModule],
  controllers: [JobOfferController],
  providers: [JobOfferService],
})
export class JobOfferModule {}
