import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './auth.decorators.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';

@ApiTags('users')
@ApiBearerAuth()
@Roles('ADMIN')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear usuario en Cognito' })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuarios de Cognito' })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('nextToken') nextToken?: string,
  ) {
    if (limit !== undefined && (limit < 1 || limit > 60)) {
      throw new BadRequestException('limit debe estar entre 1 y 60');
    }
    return this.usersService.findAll(limit, nextToken);
  }

  @Get(':username')
  @ApiOperation({ summary: 'Consultar un usuario de Cognito' })
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @Patch(':username')
  @ApiOperation({ summary: 'Actualizar atributos o estado del usuario' })
  update(@Param('username') username: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(username, dto);
  }

  @Post(':username/password')
  @ApiOperation({ summary: 'Restablecer contraseña de usuario' })
  resetPassword(
    @Param('username') username: string,
    @Body() dto: ResetUserPasswordDto,
  ) {
    return this.usersService.resetPassword(username, dto);
  }

  @Delete(':username')
  @ApiOperation({ summary: 'Eliminar usuario de Cognito' })
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
