import Cart from "../components/Cart";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import useAuthContext from "../context/useAuthContext";

function Layout() {
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const { apiToken } = useAuthContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navbar setShowCart={setShowCart} />
      {apiToken && showCart && <Cart setShowCart={setShowCart} />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
