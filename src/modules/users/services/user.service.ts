import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.log('userById');
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return user;
  }

  async getAllUsers({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    this.logger.log('getAllUsers');
    const data = await this.prisma.user.findMany({
      skip: skip,
      take: limit,
    });
    const total = await this.prisma.user.count();
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      totalPages,
      currentPage: page,
    };
  }

  async createUser(
    data: Prisma.UserCreateInput,
    userDto: UserDto,
  ): Promise<User> {
    this.logger.log('createUser');
    const createUser = await this.prisma.user.create({
      data,
    });

    if (userDto?.type === 'collaborator') {
      await this.prisma.collaborator.create({
        data: {
          phone_number: userDto.phone_number,
          user: { connect: { user_id: createUser.user_id } },
        },
      });
    } else if (userDto?.type === 'company') {
      await this.prisma.company.create({
        data: {
          phone_number: userDto.phone_number,
          contact_name: userDto.contact_name,
          user: { connect: { user_id: createUser.user_id } },
        },
      });
    }
    return createUser;
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    this.logger.log('updateUser');
    const updateUser = await this.prisma.user.update({
      where: params.where,
      data: params.data,
    });
    return updateUser;
  }
}
