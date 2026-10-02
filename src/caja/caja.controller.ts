import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CajaService } from './caja.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

@ApiTags('caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @Get()
  getCaja() {
    return this.cajaService.getCaja();
  }

  @Get('summary')
  getSummary(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.cajaService.getSummary(from, to);
  }

  @Get('expenses')
  getExpenses(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.cajaService.getExpenses(from, to);
  }

  @Post('expenses')
  addExpense(@Body() dto: CreateExpenseDto) {
    return this.cajaService.addExpense(dto.description, dto.amount);
  }

  @Delete('expenses/:id')
  removeExpense(@Param('id') id: string) {
    return this.cajaService.removeExpense(id);
  }
}
