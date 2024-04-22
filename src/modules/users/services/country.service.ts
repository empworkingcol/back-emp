import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Country } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('Country service');

  async getCountry(
    countryWhereUniqueInput: Prisma.CountryWhereUniqueInput,
  ): Promise<Country | null> {
    this.logger.log('countryById');
    const country = await this.prisma.country.findUnique({
      where: countryWhereUniqueInput,
    });
    return country;
  }

  async getAllCountries() {
    this.logger.log('getAllCountries');
    const data = await this.prisma.country.findMany();

    return {
      data,
    };
  }

  async createCountry(data: Prisma.CountryCreateInput): Promise<Country> {
    this.logger.log('createCountry');
    const createCountry = await this.prisma.country.create({
      data,
    });

    return createCountry;
  }

  async updateCountry(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    this.logger.log('updateCountry');
    const updateCountry = await this.prisma.country.update({
      where: params.where,
      data: params.data,
    });
    return updateCountry;
  }
}
