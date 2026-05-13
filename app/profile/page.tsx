import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const card = await prisma.loyaltyCard.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!card) {
    redirect("/login");
  }

  return (
    <ProfileClient
      user={{
        name: card.user.name,
        email: card.user.email,
        id: session.user.id,
      }}
      card={{
        stamps: card.stamps,
        freeDrinks: card.freeDrinks,
      }}
    />
  );
}
