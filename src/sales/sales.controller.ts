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
import { SalesService } from './sales.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';

@ApiTags('sales')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Roles('ADMIN', 'MANAGER', 'SELLER')
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'SELLER', 'GUEST')
  findAll(
    @Query('productId') productId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.salesService.findAll({ productId, from, to });
  }

  @Get('summary')
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'SELLER', 'GUEST')
  getSummary(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.salesService.getSummary(from, to);
  }

  @Get(':id')
  @Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'SELLER', 'GUEST')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
