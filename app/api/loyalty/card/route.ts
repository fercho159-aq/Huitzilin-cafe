import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const card = await prisma.loyaltyCard.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { name: true, email: true } }, logs: { orderBy: { createdAt: "desc" }, take: 5 } },
  });

  if (!card) {
    return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 });
  }

  return NextResponse.json(card);
}
