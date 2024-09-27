import image from "../assets/img/cartOnLap.jpg";
import { GoTo } from "./smoothScroll";

const Home = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-fill bg-center"
        style={{
          backgroundImage: `url(${image})`,
          height: "90dvh",
          zIndex: -1,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(96%)",
        }}
      ></div>
      <div className="relative flex flex-col justify-between items-center lg:px-32 px-5 pt-24 lg:pt-10 h-[87dvh]">
        <div className="text-center space-y-4 px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white w-full md:w-3/4 mx-auto">
            Discover, Shop, and Enjoy!
          </h1>
          <p className="w-full md:w-2/3 text-lg md:text-xl text-gray-300 font-light mx-auto">
            Your one-stop shop for all your needs!
          </p>
        </div>

        <div className="w-full flex justify-center pb-10">
          <GoTo to="/product/category/1" id="shop" offset={0}>
            <span className="inline-block border border-white text-white bg-transparent px-6 py-3 font-medium rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:text-black shadow-lg">
              Shop Now
            </span>
          </GoTo>
        </div>
      </div>
    </div>
  );
};

export default Home;
