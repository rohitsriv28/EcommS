import image from "../assets/img/cartOnLap.jpg";
import { GoTo } from "./smoothScroll";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative h-[90dvh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-6 lg:px-20 flex flex-col justify-center items-start z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-6"
        >
          {/* Badge */}
          <span className="inline-block px-4 py-1 border border-Red text-Red rounded-full uppercase tracking-wider text-sm font-semibold bg-Red/10 backdrop-blur-sm">
            New Season Arrivals
          </span>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-white leading-tight drop-shadow-lg">
            Discover, Shop, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              & Enjoy!
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed max-w-lg">
            Experience the best in fashion and lifestyle. Your premium one-stop
            destination for verified quality and style.
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <GoTo to="/product/category/1" id="shop" offset={0}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-Red text-white font-semibold rounded-none overflow-hidden shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  SHOP NOW
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
              </motion.button>
            </GoTo>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Home;
