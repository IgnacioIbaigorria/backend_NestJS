import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryService } from './history.service.js';

@ApiTags('history')
@ApiBearerAuth()
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
