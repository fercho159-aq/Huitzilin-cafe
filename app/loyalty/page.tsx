import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageLayout } from "@/components/page-layout";
import { Loyalty } from "@/components/sections/loyalty";
import { LoyaltyCard } from "./loyalty-card";

export default async function LoyaltyPage() {
  const session = await auth();

  // Anonymous or staff users see the marketing landing.
  if (!session?.user?.id || session.user.role !== "CLIENT") {
    return (
      <PageLayout>
        <Loyalty />
      </PageLayout>
    );
  }

  const card = await prisma.loyaltyCard.findUnique({
    where: { userId: session.user.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!card) {
    return (
      <PageLayout>
        <Loyalty />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <LoyaltyCard
        user={{
          id: session.user.id,
          name: card.user.name,
          email: card.user.email,
        }}
        card={{
          stamps: card.stamps,
          freeDrinks: card.freeDrinks,
        }}
      />
    </PageLayout>
  );
}
