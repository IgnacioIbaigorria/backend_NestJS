import { Module } from '@nestjs/common';
import { HistoryService } from './history.service.js';
import { HistoryController } from './history.controller.js';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
