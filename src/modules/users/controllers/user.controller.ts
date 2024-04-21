import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';

import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '15',
  ) {
    return this.userService.getAllUsers({
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':user_id')
  async getUser(@Param('user_id') user_id: string) {
    return this.userService.getUser({ user_id: user_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDto: UserDto): Promise<UserModel> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      city: { connect: { city_id: createUserDto.city_id } },
      rol: { connect: { rol_id: createUserDto.rol_id } },
    };
    return this.userService.createUser(data, createUserDto);
  }

  @Put(':user_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('user_id') user_id: string,
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { user_id: user_id },
      data: userData,
    });
  }
}
