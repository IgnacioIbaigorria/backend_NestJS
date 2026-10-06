import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
import { HistoryService } from './history.service.js';

@ApiTags('history')
@ApiBearerAuth()
@Roles('ADMIN', 'MANAGER', 'INVENTORY_MANAGER', 'GUEST')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll(
    @Query('productId') productId?: string,
    @Query('field') field?: string,
  ) {
    return this.historyService.findAll({ productId, field });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }
}
