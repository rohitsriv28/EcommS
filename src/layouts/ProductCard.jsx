import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/base.api";
import { useCart } from "../context/CartContext";
import { ShowToast } from "../components/CustomToast";
import { formatNumber } from "../components/utils/convetToDecimal";
import useAuthContext from "../context/useAuthContext";
import { addCart } from "../api/cart.api";
import { motion } from "framer-motion";

const ProductCard = ({
  id,
  images,
  productName,
  offerPrice,
  sellingPrice,
  // productDescription,
  discountPercentage,
  brand,
}) => {
  // console.log(brand);
  const { cartItems, setCartCount, updateLocalCartItems } = useCart();
  const [isInCart, setIsInCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stopBtn, setStopBtn] = useState(false);

  const nameRef = useRef(null);
  const navigate = useNavigate();
  const compId = localStorage.getItem("compId", 1) || 1;

  const { user } = useAuthContext();

  useEffect(() => {
    const adjustFontSize = () => {
      const nameElement = nameRef.current;
      if (nameElement) {
        let fontSize = "1rem";
        if (productName.length > 20) {
          fontSize = "0.875rem";
        }
        if (productName.length > 30) {
          fontSize = "0.75rem";
        }
        nameElement.style.fontSize = fontSize;
      }
    };

    if (productName) {
      adjustFontSize();
    }
  }, [productName]);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.productId === id));
  }, [cartItems, id]);

  const addProductCart = async () => {
    if (isInCart) {
      ShowToast("info", "Product is already in cart");
      return;
    }

    try {
      setIsLoading(true);
      setStopBtn(true);
      const datatoSend = {
        userId: user.userId || user.sub,
        companyId: Number(compId),
        products: [
          {
            productId: Number(id),
            quantity: formatNumber(1),
          },
        ],
      };

      const response = await addCart(datatoSend);
      if (response.status >= 200 && response.status < 300) {
        ShowToast("success", "Successfully added to cart");
        setIsInCart(true);
        updateLocalCartItems(Number(id));
        setCartCount((prevCount) => prevCount + 1);
      } else {
        updateLocalCartItems(Number(id), true);
        ShowToast("error", "Failed to add product to cart");
      }
    } catch (error) {
      updateLocalCartItems(Number(id), true);
      ShowToast("error", "An error occurred while adding to cart");
    } finally {
      setIsLoading(false);
      setStopBtn(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="flex flex-col w-full max-w-xs mx-auto my-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      style={{ maxHeight: "500px" }}
    >
      {images && images.length > 0 ? (
        <div className="relative overflow-hidden mt-2">
          <img
            src={`${BASE_URL}/${images[0]}`}
            alt={productName}
            className="w-full h-56 object-contain transition-transform duration-300 hover:scale-125 mix-blend-multiply"
            style={{ maxHeight: "100%" }}
          />
          {discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-48 bg-gray-200">
          <span className="text-sm font-semibold text-gray-500">
            {productName}
          </span>
        </div>
      )}
      <div className="p-4 flex flex-col h-full">
        <span>{brand && brand}</span>
        <h1
          ref={nameRef}
          className="font-semibold text-base text-gray-800 truncate mb-1"
        >
          {productName}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-auto">
          <div className="flex flex-col lg:md:lg:flex-row lg:md:lg:gap-2 lg:md:lg:items-center">
            <span className="text-lg font-bold text-gray-900">
              रु {offerPrice}
            </span>
            <span className="text-xs line-through text-gray-500 mt-1">
              {sellingPrice}
            </span>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="text-sm font-medium text-gray-700 mr-1">4.3</span>
            <FaStar className="text-yellow-400" />
          </div>
        </div>

        {/* {user ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`mt-3 px-4 py-2 w-full font-medium rounded-full transition-colors duration-200 ${
              isInCart
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              addProductCart();
            }}
            disabled={isInCart || stopBtn || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : isInCart ? (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                In Cart
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Add to Cart
              </span>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-3 px-4 py-2 w-full font-medium rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
          >
            View Product
          </motion.button>
        )} */}
      </div>
    </motion.div>
  );
};

export default ProductCard;
