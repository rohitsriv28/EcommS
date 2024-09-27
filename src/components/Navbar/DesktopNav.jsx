import React from "react";
import SearchBar from "./SearchBar";
import txtLogo from "../../assets/img/GiftsGardenTxt.png";
import { FaUser, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import DropdownUser from "./DropDownUser";
import useAuthContext from "../../context/useAuthContext";
import { GoTo } from "../smoothScroll";
import { motion } from "framer-motion";

const DeskNav = ({
  cartCount,
  openAuthPage,
  setCartVisible,
  openMobileMenu,
}) => {
  const { apiToken } = useAuthContext();

  return (
    <header className="sticky top-0 w-full z-50 bg-white mb-4 lg:mb-0">
      <section className="flex flex-col">
        <div className="flex justify-between items-center px-4 md:px-16 md:py-5 mt-7 relative">
          <SearchBar />

          {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"> */}
          <GoTo to="/" id="home" offset={200}>
            <img src={txtLogo} alt="Logo" className="w-40 cursor-pointer" />
          </GoTo>
          {/* </div> */}

          <div className="flex items-center gap-5">
            {apiToken ? (
              <DropdownUser />
            ) : (
              <FaRegUser
                size={25}
                className="text-DarkColor cursor-pointer"
                onClick={openAuthPage}
              />
            )}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-DarkColor relative"
            >
              <FaShoppingCart
                size={25}
                className="cursor-pointer"
                onClick={() => setCartVisible(true)}
              />
              <div className="absolute top-[-17px] right-[-10px] bg-red-600 w-[24px] h-[20px] rounded-full text-white text-sm grid place-items-center">
                {cartCount}
              </div>
            </motion.div>
            <RiMenuLine
              size={25}
              className="text-DarkColor cursor-pointer lg:hidden"
              onClick={openMobileMenu}
            />
          </div>
        </div>

        <nav className="hidden lg:flex flex-row justify-center items-center text-lg font-semibold gap-24 mt-4 p-4">
          <GoTo to="/" id="home" offset={200}>
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Home
            </motion.h3>
          </GoTo>
          <GoTo to="/product/category/1" id="mobiles" offset={140}>
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Mobile
            </motion.h3>
          </GoTo>
          <GoTo to="/product/category/2" id="electronics">
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Electronics
            </motion.h3>
          </GoTo>
          <GoTo to="/product/category/3" id="fashion">
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Fashion
            </motion.h3>
          </GoTo>
          <GoTo to="/product/category/4" id="health_beauty" offset={140}>
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Health & Beauty
            </motion.h3>
          </GoTo>
          <GoTo to="/product/category/5" id="home_kitchen">
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Home & Kitchen
            </motion.h3>
          </GoTo>
          <GoTo to="/" id="review" offset={120}>
            <motion.h3
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
              className="transition-colors duration-300"
            >
              Review
            </motion.h3>
          </GoTo>
        </nav>
      </section>
    </header>
  );
};

export default DeskNav;
