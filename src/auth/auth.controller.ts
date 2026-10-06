import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { CookieOptions, Request, Response } from 'express';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CognitoBffService } from './cognito-bff.service.js';
import { Public } from './auth.decorators.js';

class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

class RefreshDto {
  // Compatibilidad con clientes antiguos que aún envían el token en el body.
  // Los clientes actualizados usan la cookie HttpOnly y no lo envían.
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

const REFRESH_COOKIE = 'bodega_refresh';
const REFRESH_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 días, ventana deslizante

// Path acotado a los endpoints de auth: la cookie no viaja con el resto de la API.
const REFRESH_COOKIE_BASE: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/api/auth',
};

const REFRESH_COOKIE_SET: CookieOptions = {
  ...REFRESH_COOKIE_BASE,
  maxAge: REFRESH_COOKIE_MAX_AGE,
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly cognitoBffService: CognitoBffService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión con usuario y contraseña' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, expiresIn, tokenType } =
      await this.cognitoBffService.login(dto.username, dto.password);

    // El refresh token vive solo en la cookie HttpOnly: el JavaScript del
    // navegador nunca puede leerlo (protección contra robo por XSS).
    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_SET);

    return { accessToken, expiresIn, tokenType };
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token a partir de la cookie de refresh' })
  async refresh(
    @Body() dto: RefreshDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken: string | undefined =
      req.cookies?.[REFRESH_COOKIE] ?? dto.refreshToken;

    if (!refreshToken) {
      res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
      throw new UnauthorizedException('La sesión expiró');
    }

    try {
      const { accessToken, refreshToken: rotated, expiresIn, tokenType } =
        await this.cognitoBffService.refreshToken(refreshToken, dto.username);

      // Renueva la cookie en cada refresh (ventana deslizante de 30 días)
      res.cookie(REFRESH_COOKIE, rotated, REFRESH_COOKIE_SET);
      return { accessToken, expiresIn, tokenType };
    } catch (error) {
      // Cookie inválida o vencida: se elimina para no reintentar en vano
      res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
      throw error;
    }
  }

  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión eliminando la cookie de refresh' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(REFRESH_COOKIE, REFRESH_COOKIE_BASE);
    return { ok: true };
  }
}
