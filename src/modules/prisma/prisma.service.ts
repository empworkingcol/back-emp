import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger('Services up');
  async onModuleInit() {
    try {
      await this.user.findMany({ take: 1 });
      this.logger.log('Successfully connected to the database.');
    } catch (error) {
      this.logger.log('Failed to connect to the database.', error);
    }
  }
}
