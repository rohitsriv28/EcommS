import img from "../assets/img/collection.png";
import { Link } from "react-scroll";
import { GoTo } from "./smoothScroll";

const Collection = () => {
  return (
    <div className="h-screen lg:h-[70ch] flex flex-col justify-center lg:flex-row items-center mt-14 lg:px-32 px-5">
      {/* image sections */}
      <div className="flex justify-center w-full lg:w-2/4 pt-6">
        <img src={img} alt="image" />
      </div>
      {/* content section */}
      <div className="w-full lg:w-2/4 space-y-4 pt-5 text-center lg:text-start">
        <h1 className="text-4xl font-semibold text-ExtraDarkColor">
          Best Summer Collection
        </h1>
        <h3 className="text-lg font-medium text-DarkColor">
          Sale Get Up To 60% off
        </h3>
        <p>
          Discover the ultimate summer fashion collection, featuring a stunning
          array of stylish and comfortable pieces. Upgrade your wardrobe and
          take advantage of our incredible sale, with discounts up to 60% off.
          Don't miss out
        </p>
        <GoTo to="/product/category/1" id="fashion" offset={-40}>
          <span className="inline-block bg-ExtraDarkColor text-white px-4 py-2 font-medium cursor-pointer active:bg-teal-800">
            Shop Now
          </span>
        </GoTo>
      </div>
    </div>
  );
};

export default Collection;
