import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const card = await prisma.loyaltyCard.findUnique({
    where: { userId: session.user.id },
  });

  if (!card || card.freeDrinks <= 0) {
    return NextResponse.json({ error: "No tienes bebidas gratis disponibles" }, { status: 400 });
  }

  const updated = await prisma.loyaltyCard.update({
    where: { userId: session.user.id },
    data: { freeDrinks: { decrement: 1 } },
  });

  return NextResponse.json({
    card: updated,
    message: "Americano gratis canjeado.",
  });
}
