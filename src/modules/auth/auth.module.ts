import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './config/jwt.strategy';
import { UserModule } from '../users/user.module';
import { JwtAuthGuard } from './config/jwt-auth.guard';
import { LocalStrategy } from './config/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SIGN'),
        signOptions: { expiresIn: configService.get<string>('EXPIRE') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
