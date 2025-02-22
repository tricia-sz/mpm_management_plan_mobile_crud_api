import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { CustomerPlansDto } from './dto/customer-plans.dto';
import { PrismaClientKnownRequestError } from 'src/prisma/prisma-exceptions.filter';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseFilters(PrismaClientKnownRequestError)
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() queries: QueryCustomerDto) {
    return this.customersService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post(':id/plans')
  addPlans(@Param('id') id: string, @Body() { plansId }: CustomerPlansDto) {
    return this.customersService.addPlans(id, plansId);
  }

  @Delete(':id/plans')
  removePlans(@Param('id') id: string, @Body() { plansId }: CustomerPlansDto) {
    return this.customersService.removePlans(id, plansId);
  }

  @Get(':id/plans')
  listPlans(@Param('id') id: string) {
    return this.customersService.listPlans(id);
  }

  @UseFilters(PrismaClientKnownRequestError)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
