import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryCustomerDto } from './dto/query-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prismaService.customer.create({ data: createCustomerDto });
  }

  findAll(queries: QueryCustomerDto) {
    return this.prismaService.customer.findMany({
      where:
        queries.name || queries.cpf
          ? {
              OR: [
                queries.name
                  ? {
                      fullName: {
                        contains: queries.name,
                        mode: 'insensitive',
                      },
                    }
                  : {},
                queries.cpf
                  ? {
                      cpf: {
                        contains: queries.cpf,
                        mode: 'insensitive',
                      },
                    }
                  : {},
              ],
            }
          : {},
    });
  }

  findOne(id: string) {
    return this.prismaService.customer.findUnique({
      where: { id },
    });
  }

  addPlans(customerId: string, plansId: string[]) {
    return this.prismaService.planCustomer.createMany({
      data: plansId.map((planId) => ({
        customerId,
        planId,
      })),
      skipDuplicates: true,
    });
  }

  removePlans(customerId: string, plansId: string[]) {
    return this.prismaService.planCustomer.deleteMany({
      where: {
        customerId,
        planId: { in: plansId },
      },
    });
  }

  listPlans(customerId: string) {
    return this.prismaService.planCustomer
      .findMany({
        where: { customerId },
        select: { plan: true },
      })
      .then((plans) => plans.map(({ plan }) => plan));
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.prismaService.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  remove(id: string) {
    return this.prismaService.customer.delete({
      where: { id },
    });
  }
}
