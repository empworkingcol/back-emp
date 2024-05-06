import { Expose } from 'class-transformer';

export class AuthUserDto {
  @Expose()
  user_name: string;

  @Expose()
  rol: {
    rol_name: string;
  };

  @Expose()
  password: string;

  @Expose()
  email: string;
}

export class ResUserDto {
  @Expose()
  user_name: string;

  @Expose()
  email: string;

  @Expose()
  city: {
    city_name: string;
    country: {
      country_name: string;
    };
  };

  @Expose()
  phone_number?: string;

  @Expose()
  contact_name?: string;
}
