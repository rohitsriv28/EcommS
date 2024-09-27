// import { useState, useEffect } from "react";
// import { Link as ScrollLink } from "react-scroll";
// import { useLocation, Link, useNavigate } from "react-router-dom";
// import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
// import { RiMenu2Line } from "react-icons/ri";
// import { useAppSelector } from "../Redux/Hooks";
// import Cart from "../components/Cart";
// import txtLogo from "../assets/img/GiftsGardenTxt.png";

// const Navbar = () => {
//   const [menu, setMenu] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [cartVisible, setCartVisible] = useState(false);
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const cartCount = useAppSelector((state) => state.cartReducer.length);

//   const handleChange = () => {
//     setMenu(!menu);
//   };

//   const closeMenu = () => {
//     setMenu(false);
//   };

//   const openAuthPage = () => {
//     navigate("/auth/login");
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const mainSection = document.getElementById("main");
//       if (pathname === "/" && mainSection) {
//         const mainSectionTop = mainSection.getBoundingClientRect().top;
//         if (mainSectionTop <= 0 && window.scrollY > 80) {
//           setIsScrolled(true);
//         } else {
//           setIsScrolled(false);
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [pathname]);

//   const GoTo = pathname === "/" ? ScrollLink : Link;

//   return (
//     <header className="sticky top-0 w-full z-50 bg-white mb-4 lg:mb-0">
//       <section className="flex flex-col">
//         <div className="flex justify-between items-center px-4 md:px-16 md:py-5 mt-7 relative">
//           {/* Search Icon */}
//           <div className="flex items-center">
//             <div className="relative hidden lg:flex items-center">
//               <FaSearch
//                 size={25}
//                 className="text-DarkColor cursor-pointer"
//                 onClick={() => setShowSearch(!showSearch)}
//               />
//               {showSearch && (
//                 <input
//                   type="text"
//                   className="absolute bottom-0.5 left-10 mb-2 transform translate-y-1/2 border outline-none bg-white border-ExtraDarkColor rounded-3xl py-2 p-3 shadow-lg w-60"
//                   placeholder="Search products..."
//                 />
//               )}
//             </div>
//           </div>

//           {/* Logo */}
//           <GoTo
//             to={`${pathname === "/" ? "home" : "/#home"}`}
//             smooth={true}
//             duration={500}
//           >
//             <img
//               src={txtLogo}
//               alt="Logo"
//               className="w-40 text cursor-pointer"
//             />
//           </GoTo>

//           {/* Navbar icons */}
//           <div className="flex items-center gap-5">
//             <FaUser
//               size={25}
//               className="text-DarkColor cursor-pointer"
//               onClick={openAuthPage}
//             />
//             <div className="text-DarkColor relative">
//               <FaShoppingCart
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => setCartVisible(true)}
//               />
//               <div className="absolute top-[-17px] right-[-10px] bg-red-600 w-[22px] h-[20px] rounded-full text-white text-sm grid place-items-center">
//                 {cartCount}
//               </div>
//             </div>
//             <div className="lg:hidden flex items-center">
//               {menu ? (
//                 <AiOutlineClose size={28} onClick={handleChange} />
//               ) : (
//                 <RiMenu2Line size={28} onClick={handleChange} />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="hidden lg:flex flex-row justify-center items-center text-lg font-semibold gap-8 mt-4 text-ExtraDarkColor p-4">
//           <GoTo
//             to={`${pathname === "/" ? "home" : "/#home"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//           >
//             Home
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "shop" : "/#shop"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//           >
//             Shop
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "features" : "/#features"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//           >
//             Features
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "products" : "/#products"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//           >
//             Products
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "review" : "/#review"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//           >
//             Review
//           </GoTo>
//         </nav>

//         {/* Mobile menu */}
//         <div
//           className={`${
//             menu ? "translate-x-0" : "translate-x-full"
//           } lg:hidden fixed inset-y-0 right-0 bg-SecondaryColor text-black font-semibold text-2xl text-center py-8 gap-4 w-full h-fit flex flex-col items-center transition-transform duration-300 z-40`}
//         >
//           <AiOutlineClose
//             size={28}
//             className="self-end mr-5 mb-4 cursor-pointer"
//             onClick={handleChange}
//           />
//           <GoTo
//             to={`${pathname === "/" ? "home" : "/#home"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//             onClick={closeMenu}
//           >
//             Home
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "shop" : "/#shop"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//             onClick={closeMenu}
//           >
//             Shop
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "features" : "/#features"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//             onClick={closeMenu}
//           >
//             Features
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "products" : "/#products"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//             onClick={closeMenu}
//           >
//             Products
//           </GoTo>
//           <GoTo
//             to={`${pathname === "/" ? "review" : "/#review"}`}
//             spy={true}
//             smooth={true}
//             duration={500}
//             className="hover:text-black transition duration-300 ease-in-out cursor-pointer"
//             onClick={closeMenu}
//           >
//             Review
//           </GoTo>
//         </div>
//       </section>
//       {cartVisible && <Cart setShowCart={setCartVisible} />}
//     </header>
//   );
// };

// export default Navbar;
