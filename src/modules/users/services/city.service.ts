import { Injectable, Logger } from '@nestjs/common';
import { Prisma, City } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('City service');

  async getCity(
    cityWhereUniqueInput: Prisma.CityWhereUniqueInput,
  ): Promise<City | null> {
    this.logger.log('cityById');
    const city = await this.prisma.city.findUnique({
      where: cityWhereUniqueInput,
    });
    return city;
  }

  async getCitiesByCountry(countryId: string) {
    this.logger.log('getAllCities');
    const data = await this.prisma.city.findMany({
      where: {
        country_id: countryId,
      },
    });

    return {
      data,
    };
  }

  async createCity(data: Prisma.CityCreateInput): Promise<City> {
    this.logger.log('createCity');
    const createCity = await this.prisma.city.create({
      data,
    });

    return createCity;
  }

  async updateCity(params: {
    where: Prisma.CityWhereUniqueInput;
    data: Prisma.CityUpdateInput;
  }): Promise<City> {
    this.logger.log('updateCity');
    const updateCity = await this.prisma.city.update({
      where: params.where,
      data: params.data,
    });
    return updateCity;
  }
}
