import { AiOutlineClose } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const MobileNav = ({ menu, setMenu, closeMenu }) => {
  const { pathname } = useLocation();
  const GoTo = pathname === "/" ? ScrollLink : Link;
  const menuRef = useRef(null);

  const handleChange = () => {
    setMenu(!menu);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menu && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu, setMenu]);

  return (
    <div
      ref={menuRef}
      className={`fixed inset-y-0 right-0 mt-10 bg-SecondaryColor text-black font-semibold text-2xl text-center py-8 gap-4 w-full h-full flex flex-col items-center transition-transform duration-300 z-40 transform ${
        menu ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* X icon */}
      <div className="w-full flex justify-end px-4">
        {menu && (
          <AiOutlineClose
            size={28}
            className="cursor-pointer text-black"
            onClick={handleChange}
          />
        )}
      </div>
      {/* Menu items */}
      <div className="flex flex-col gap-4 mt-6">
        <GoTo
          to={pathname === "/" ? "home" : "/#home"}
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            closeMenu();
            handleChange();
          }}
        >
          Home
        </GoTo>
        <GoTo
          to={pathname === "/" ? "shop" : "/#shop"}
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            closeMenu();
            handleChange();
          }}
        >
          Shop
        </GoTo>
        <GoTo
          to={pathname === "/" ? "mobiles" : "/#mobiles"}
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            closeMenu();
            handleChange();
          }}
        >
          Mobiles
        </GoTo>
        <GoTo
          to={pathname === "/" ? "products" : "/#products"}
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            closeMenu();
            handleChange();
          }}
        >
          Products
        </GoTo>
        <GoTo
          to={pathname === "/" ? "review" : "/#review"}
          spy={true}
          smooth={true}
          duration={500}
          className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
          onClick={() => {
            closeMenu();
            handleChange();
          }}
        >
          Review
        </GoTo>
      </div>
    </div>
  );
};

export default MobileNav;
