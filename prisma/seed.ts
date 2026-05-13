import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const clientExists = await prisma.user.findUnique({ where: { email: "cliente@test.com" } });
  if (!clientExists) {
    await prisma.user.create({
      data: {
        name: "Cliente Test",
        email: "cliente@test.com",
        password: await bcrypt.hash("123456", 12),
        role: "CLIENT",
        loyaltyCard: { create: { stamps: 3, freeDrinks: 0 } },
      },
    });
    console.log("✅ Cliente creado: cliente@test.com / 123456");
  }

  const baristaExists = await prisma.user.findUnique({ where: { email: "barista@test.com" } });
  if (!baristaExists) {
    await prisma.user.create({
      data: {
        name: "Barista Test",
        email: "barista@test.com",
        password: await bcrypt.hash("123456", 12),
        role: "BARISTA",
        loyaltyCard: { create: { stamps: 0, freeDrinks: 0 } },
      },
    });
    console.log("✅ Barista creado: barista@test.com / 123456");
  }

  const adminExists = await prisma.user.findUnique({ where: { email: "admin@test.com" } });
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: "Admin Test",
        email: "admin@test.com",
        password: await bcrypt.hash("123456", 12),
        role: "ADMIN",
        loyaltyCard: { create: { stamps: 0, freeDrinks: 0 } },
      },
    });
    console.log("✅ Admin creado: admin@test.com / 123456");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
