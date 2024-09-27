import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import Cart from "../Cart";
import DeskNav from "./DesktopNav";
import { useCart } from "../../context/CartContext";
import useAuthContext from "../../context/useAuthContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const { user } = useAuthContext();

  const { cartCount } = useCart();

  let cc = cartCount < 0 ? 0 : cartCount;
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenu(false);
  };

  const openAuthPage = () => {
    navigate("/auth/login");
  };

  const openMobileMenu = () => {
    setMenu(true);
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white mb-4 lg:mb-0 shadow-md">
      <section className="flex flex-col">
        <DeskNav
          cartCount={!user ? 0 : cc}
          openAuthPage={openAuthPage}
          setCartVisible={setCartVisible}
          openMobileMenu={openMobileMenu}
        />
        <MobileNav menu={menu} setMenu={setMenu} closeMenu={closeMenu} />
      </section>
      {cartVisible && <Cart setShowCart={setCartVisible} />}
    </header>
  );
};

export default Navbar;
