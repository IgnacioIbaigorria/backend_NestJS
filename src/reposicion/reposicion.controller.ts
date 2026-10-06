import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
import { ReposicionService } from './reposicion.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';

@ApiTags('reposicion')
@ApiBearerAuth()
@Controller('reposicion')
export class ReposicionController {
  constructor(private readonly reposicionService: ReposicionService) {}

  @Post()
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER')
  create(@Body() dto: CreateReposicionDto) {
    return this.reposicionService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER')
  findAll(@Query('productId') productId?: string) {
    return this.reposicionService.findAll({ productId });
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER')
  findOne(@Param('id') id: string) {
    return this.reposicionService.findOne(id);
  }
}
