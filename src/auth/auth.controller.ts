import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CognitoBffService } from './cognito-bff.service.js';
import { Public } from './auth.decorators.js';

class LoginDto {
  username: string;
  password: string;
}

class RefreshDto {
  refreshToken: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly cognitoBffService: CognitoBffService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con usuario y contraseña' })
  async login(@Body() dto: LoginDto) {
    return this.cognitoBffService.login(dto.username, dto.password);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token con refresh token' })
  async refresh(@Body() dto: RefreshDto) {
    return this.cognitoBffService.refreshToken(dto.refreshToken);
  }
}
