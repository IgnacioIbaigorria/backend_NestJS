import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReposicionService } from './reposicion.service.js';
import { CreateReposicionDto } from './dto/create-reposicion.dto.js';

@ApiTags('reposicion')
@Controller('reposicion')
export class ReposicionController {
  constructor(private readonly reposicionService: ReposicionService) {}

  @Post()
  create(@Body() dto: CreateReposicionDto) {
    return this.reposicionService.create(dto);
  }

  @Get()
  findAll(@Query('productId') productId?: string) {
    return this.reposicionService.findAll({ productId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reposicionService.findOne(id);
  }
}
