import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RolService } from './services/rol.service';
import { CountryService } from './services/country.service';
import { CityService } from './services/city.service';
import { RolController } from './controllers/rol.controller';
import { CountryController } from './controllers/country.controller';
import { CityController } from './controllers/city.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    UserController,
    RolController,
    CountryController,
    CityController,
  ],
  providers: [UserService, RolService, CountryService, CityService],
})
export class UserModule {}
