import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Rol } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Rol service');

  async getRol(
    rolWhereUniqueInput: Prisma.RolWhereUniqueInput,
  ): Promise<Rol | null> {
    this.logger.log('rolById');
    const rol = await this.prisma.rol.findUnique({
      where: rolWhereUniqueInput,
    });
    return rol;
  }

  async getAllRoles() {
    this.logger.log('getAllRoles');
    const data = await this.prisma.rol.findMany();

    return {
      data,
    };
  }

  async createRol(data: Prisma.RolCreateInput): Promise<Rol> {
    this.logger.log('createRol');
    const createRol = await this.prisma.rol.create({
      data,
    });

    return createRol;
  }

  async updateRol(params: {
    where: Prisma.RolWhereUniqueInput;
    data: Prisma.RolUpdateInput;
  }): Promise<Rol> {
    this.logger.log('updateRol');
    const updateRol = await this.prisma.rol.update({
      where: params.where,
      data: params.data,
    });
    return updateRol;
  }
}
