import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    // Best-effort: preserve the original path so login can bounce the user back.
    // Falls back to /admin if the runtime doesn't expose the request path.
    const hdrs = await headers();
    const path = hdrs.get("x-pathname") || hdrs.get("x-invoke-path") || "/admin";
    redirect(`/login?callbackUrl=${encodeURIComponent(path)}`);
  }

  const role = session.user.role;
  if (role !== "BARISTA" && role !== "ADMIN") {
    redirect("/");
  }

  return <>{children}</>;
}
