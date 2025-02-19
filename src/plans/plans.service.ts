import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryPlanDto } from './dto/query-plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPlanDto: CreatePlanDto) {
    return this.prismaService.plan.create({ data: createPlanDto });
  }

  findAll(queries: QueryPlanDto) {
    return this.prismaService.plan.findMany({
      where:
        queries.name || queries.price
          ? {
              OR: [
                queries.name
                  ? {
                      planName: {
                        contains: queries.name,
                        mode: 'insensitive',
                      },
                    }
                  : {},
                queries.price
                  ? {
                      price: {
                        equals: queries.price,
                      },
                    }
                  : {},
              ],
            }
          : {},
    });
  }

  findOne(id: string) {
    return this.prismaService.plan.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.prismaService.plan.update({
      where: { id },
      data: updatePlanDto,
    });
  }

  remove(id: string) {
    return this.prismaService.plan.delete({
      where: { id },
    });
  }
}
