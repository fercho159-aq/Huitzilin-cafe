"use client";

import { useState } from "react";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { CartDrawer } from "./cart-drawer";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Nav onOpenCart={() => setCartOpen(true)} />
      <main className="flex-1 page-animate">{children}</main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
