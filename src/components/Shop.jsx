import React, { useEffect, useState } from "react";
import ProductCard from "../layouts/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Shop = ({ products }) => {
  const limitedProducts = products.slice(0, 7);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: windowWidth >= 768,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col justify-center lg:px-32 px-5 pt-14 ">
      <div>
        <h1 className="font-bold text-5xl text-center text-black tracking-wide mb-6">
          Best Sellers
        </h1>
      </div>
      <div className="relative mt-4">
        <Slider {...settings}>
          {limitedProducts &&
            limitedProducts.length > 0 &&
            limitedProducts.map((item) => (
              <div
                key={item.id}
                className="mb-8 px-2 transition-transform transform hover:scale-105 duration-300"
              >
                <ProductCard
                  id={item.id}
                  images={item.images}
                  productName={item.productName ? item.productName : "N/A"}
                  offerPrice={item.offerPrice}
                  sellingPrice={item.sellingPrice}
                  productDescription={item.productDescription}
                  discountPercentage={item.discountPercentage}
                />
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Shop;
