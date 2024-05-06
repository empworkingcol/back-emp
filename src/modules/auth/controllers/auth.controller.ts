import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../config/local-auth.guard';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const authResult = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );
    return authResult;
  }
}
