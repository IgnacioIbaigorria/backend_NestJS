import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/auth.decorators.js';
import { CajaService } from './caja.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

@ApiTags('caja')
@ApiBearerAuth()
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
  @Roles('ADMIN', 'MANAGER')
  addExpense(@Body() dto: CreateExpenseDto) {
    return this.cajaService.addExpense(dto.description, dto.amount);
  }

  @Delete('expenses/:id')
  @Roles('ADMIN', 'MANAGER')
  removeExpense(@Param('id') id: string) {
    return this.cajaService.removeExpense(id);
  }
}
