/* Café Boréal — main App */

function App() {
  const [route, setRoute] = useStateC(() => {
    try { return localStorage.getItem("boreal_route") || "home"; } catch { return "home"; }
  });
  const [branch, setBranch] = useStateC(() => {
    try {
      const id = localStorage.getItem("boreal_branch");
      return BRANCHES.find(b => b.id === id) || BRANCHES[0];
    } catch { return BRANCHES[0]; }
  });
  const [cart, setCart] = useStateC(() => {
    try { return JSON.parse(localStorage.getItem("boreal_cart") || "{}"); } catch { return {}; }
  });
  const [cartOpen, setCartOpen] = useStateC(false);

  useEffectC(() => { try { localStorage.setItem("boreal_route", route); } catch {} window.scrollTo(0, 0); }, [route]);
  useEffectC(() => { try { localStorage.setItem("boreal_branch", branch.id); } catch {} }, [branch]);
  useEffectC(() => { try { localStorage.setItem("boreal_cart", JSON.stringify(cart)); } catch {} }, [cart]);

  const addToCart = useCallbackC((id) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }, []);
  const removeFromCart = useCallbackC((id) => {
    setCart(c => {
      const n = { ...c };
      if (!n[id]) return c;
      n[id] -= 1;
      if (n[id] <= 0) delete n[id];
      return n;
    });
  }, []);
  const clearCart = useCallbackC(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);

  if (route === "admin") {
    return <Admin setRoute={setRoute} />;
  }

  return (
    <div>
      <Nav route={route} setRoute={setRoute} branch={branch} setBranch={setBranch} cartCount={cartCount} openCart={() => setCartOpen(true)} />

      <div className="page" key={route}>
        {route === "home" && (
          <>
            <Hero setRoute={setRoute} />
            <About />
            <MenuSection addToCart={addToCart} cart={cart} />
            <DoorDashStrip />
            <Locations branch={branch} setBranch={setBranch} />
            <Loyalty setRoute={setRoute} />
            <ContactSection />
          </>
        )}
        {route === "menu" && <MenuSection addToCart={addToCart} cart={cart} />}
        {route === "story" && <About />}
        {route === "locations" && <Locations branch={branch} setBranch={setBranch} />}
        {route === "loyalty" && <Loyalty setRoute={setRoute} />}
        {route === "contact" && <ContactSection />}
        {route === "pickup" && (
          <Pickup
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            branch={branch}
            setBranch={setBranch}
            clearCart={clearCart}
            setRoute={setRoute}
          />
        )}
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        items={MENU_ITEMS}
        goCheckout={() => setRoute("pickup")}
      />

      <Footer setRoute={setRoute} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LangProvider>
    <App />
  </LangProvider>
);
