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
import { Prisma, City as CityModel } from '@prisma/client';

import { CityDto } from '../dto/city.dto';
import { CityService } from '../services/city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async getCitiesByCountry(@Query('country') country_id: string) {
    return this.cityService.getCitiesByCountry(country_id);
  }

  @Get(':city_id')
  async getCity(@Param('city_id') city_id: string) {
    return this.cityService.getCity({ city_id: city_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCity(@Body() createCityDto: CityDto): Promise<CityModel> {
    const data: Prisma.CityCreateInput = {
      city_name: createCityDto.city_name,
      country: { connect: { country_id: createCityDto.country_id } },
    };
    return this.cityService.createCity(data);
  }

  @Put(':city_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCity(
    @Param('city_id') city_id: string,
    @Body() cityData: CityDto,
  ): Promise<CityModel> {
    return this.cityService.updateCity({
      where: { city_id: city_id },
      data: cityData,
    });
  }
}
