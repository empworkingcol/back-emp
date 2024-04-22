import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Rol as RolModel } from '@prisma/client';

import { RolDto } from '../dto/rol.dto';
import { RolService } from '../services/rol.service';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Get()
  async getAllRoles() {
    return this.rolService.getAllRoles();
  }

  @Get(':rol_id')
  async getRol(@Param('rol_id') rol_id: string) {
    return this.rolService.getRol({ rol_id: rol_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRol(@Body() createRolDto: RolDto): Promise<RolModel> {
    return this.rolService.createRol(createRolDto);
  }

  @Put(':rol_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateRol(
    @Param('rol_id') rol_id: string,
    @Body() rolData: { rol_name: string },
  ): Promise<RolModel> {
    return this.rolService.updateRol({
      where: { rol_id: rol_id },
      data: rolData,
    });
  }
}
