import { Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { UserDto } from '../dto/user.dto';
import { AuthUserDto, ResUserDto } from '../dto/res-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  async generatePassword(password: string): Promise<string> {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 4096,
      timeCost: 3,
      parallelism: 1,
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<ResUserDto | null> {
    this.logger.log('userById');
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        user_name: true,
        email: true,
        city: {
          select: {
            city_name: true,
            country: {
              select: {
                country_name: true,
              },
            },
          },
        },
      },
    });
    return user;
  }

  async findUser(email: string): Promise<AuthUserDto | null> {
    this.logger.log('userByEmail');
    const user: AuthUserDto = await this.prisma.user.findUnique({
      where: { email },
      select: {
        user_id: true,
        email: true,
        user_name: true,
        password: true,
        rol: {
          select: {
            rol_name: true,
          },
        },
      },
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
    console.log(data.password);
    const hashedPassword = await this.generatePassword(data.password);
    data.password = hashedPassword;
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
