import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Test } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Test service');

  async getAllTests() {
    this.logger.log('getAllTests');
    const data = await this.prisma.test.findMany();

    return {
      data,
    };
  }

  async createTest(data: Prisma.TestCreateInput): Promise<Test> {
    this.logger.log('createTest');
    const createTest = await this.prisma.test.create({
      data,
    });

    return createTest;
  }

  async updateTest(params: {
    where: Prisma.TestWhereUniqueInput;
    data: Prisma.TestUpdateInput;
  }): Promise<Test> {
    this.logger.log('updateTest');
    const updateTest = await this.prisma.test.update({
      where: params.where,
      data: params.data,
    });
    return updateTest;
  }
}
