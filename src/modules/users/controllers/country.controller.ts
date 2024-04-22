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
import { Country as CountryModel } from '@prisma/client';

import { CountryDto } from '../dto/country.dto';
import { CountryService } from '../services/country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countriesService: CountryService) {}

  @Get()
  async getAllCountries() {
    return this.countriesService.getAllCountries();
  }

  @Get(':country_id')
  async getCountry(@Param('country_id') country_id: string) {
    return this.countriesService.getCountry({ country_id: country_id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCountry(
    @Body() createCountryDto: CountryDto,
  ): Promise<CountryModel> {
    return this.countriesService.createCountry(createCountryDto);
  }

  @Put(':country_id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateCountry(
    @Param('country_id') country_id: string,
    @Body() countriesData: { country_name: string },
  ): Promise<CountryModel> {
    return this.countriesService.updateCountry({
      where: { country_id: country_id },
      data: countriesData,
    });
  }
}
