import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { PrismaModule } from './prisma/prisma.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [CustomersModule, PrismaModule, PlansModule],
})
export class AppModule {}
