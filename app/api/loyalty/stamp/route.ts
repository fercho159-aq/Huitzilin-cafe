import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session?.user?.id || (role !== "BARISTA" && role !== "ADMIN")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { userId, branch } = body;

    if (!userId) {
      return NextResponse.json({ error: "Falta userId" }, { status: 400 });
    }

    const card = await prisma.loyaltyCard.findUnique({
      where: { userId },
    });

    if (!card) {
      return NextResponse.json({ error: "Tarjeta no encontrada" }, { status: 404 });
    }

    let newStamps = card.stamps + 1;
    let newFreeDrinks = card.freeDrinks;
    let rewardEarned = false;

    if (newStamps >= 10) {
      newStamps = 0;
      newFreeDrinks += 1;
      rewardEarned = true;
    }

    const updated = await prisma.loyaltyCard.update({
      where: { userId },
      data: {
        stamps: newStamps,
        freeDrinks: newFreeDrinks,
      },
    });

    await prisma.stampLog.create({
      data: {
        cardId: card.id,
        baristaId: session.user.id,
        branch: branch || "Yaletown",
      },
    });

    return NextResponse.json({
      card: updated,
      rewardEarned,
      message: rewardEarned ? "¡Tarjeta completada! Americano gratis acreditado." : "Stamp agregado.",
    });
  } catch (err) {
    console.error("Stamp error:", err);
    return NextResponse.json({ error: "Error al agregar stamp" }, { status: 500 });
  }
}
