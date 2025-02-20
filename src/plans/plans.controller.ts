import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { QueryPlanDto } from './dto/query-plan.dto';
import { PrismaClientKnownRequestError } from 'src/prisma/prisma-exceptions.filter';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseFilters(PrismaClientKnownRequestError)
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll(@Query() queries: QueryPlanDto) {
    return this.plansService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @UseFilters(PrismaClientKnownRequestError)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plansService.remove(id);
  }
}
