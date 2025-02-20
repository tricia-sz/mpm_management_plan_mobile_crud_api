import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const customers = await prisma.customer.createManyAndReturn({
    data: [
      {
        fullName: 'Jonh Jack',
        cpf: '01234567896',
        phone: '(99) 99999-9999',
        email: 'customer1@example.com',
      },
      {
        fullName: 'Jully Jack',
        cpf: '12345678907',
        phone: '(99) 77777-7777',
        email: 'customer2@mail.com',
      },
    ],
  });

  const plans = await prisma.plan.createManyAndReturn({
    data: [
      {
        planName: 'Standard 2',
        price: '59.99',
        dataPackage: 10,
        callMinutes: 20,
      },
      {
        planName: 'Family Plus 2',
        price: '99.99',
        dataPackage: 10,
        callMinutes: 20,
      },
      {
        planName: 'Basic 2',
        price: '29.99',
        dataPackage: 10,
        callMinutes: 20,
      },
    ],
  });
  await prisma.planCustomer.createMany({
    data: plans.map(({ id }) => ({
      customerId: customers[0].id,
      planId: id,
    })),
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
