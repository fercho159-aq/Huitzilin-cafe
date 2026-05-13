import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const role = session.user.role;
  if (role !== "BARISTA" && role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
