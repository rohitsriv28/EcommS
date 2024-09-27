import { useEffect, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { PiStarDuotone } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../api/prdoucts.api";
import { BASE_URL } from "../api/base.api";
import { useAppDispatch } from "../Redux/Hooks";
import defaultImage from "../assets/img/staticImage (2).png";
import Magnifier from "react18-image-magnifier";
import _ from "lodash";
import { ShowToast } from "./CustomToast";
import { axiosInstance } from "../config/Axios";
import useAuthContext from "../context/useAuthContext";
import { Toaster } from "react-hot-toast";
import { formatNumber } from "./utils/convetToDecimal";
import { useCart } from "../context/CartContext";
import { Popover } from "antd";
import parse from "html-react-parser";
import CartPNG from "/caart.png";

const ProductDescription = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [product, setProduct] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const compId = localStorage.getItem("compId", 1) || 1;
  const { cartItems, setCartCount, updateLocalCartItems } = useCart();
  const [stopBtn, setStopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const MAX_DESCRIPTION_LENGTH = 600;

  const content = (
    <>
      <div className="px-3 py-2">
        <p className="font-semibold mb-2">Not logged in</p>
        <p className="text-sm">Please log in to continue</p>
        <button
          className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors w-full"
          onClick={() => navigate("/auth/login")}
        >
          Go to Login
        </button>
      </div>
    </>
  );

  const fetchProductAndInventory = async (id) => {
    try {
      const resData = await getSingleProduct(id);
      const inventoryData = user ? await fetchInventoryById(id) : null;
      return { resData, inventoryData };
    } catch (error) {
      console.log("fetchProd", error);
      throw error;
    }
  };

  const updateProductState = (resData) => {
    setProduct(resData);
    if (resData.images && resData.images[0] !== null) {
      setSelectedImage(resData.images[0]);
    }
  };

  const updateInventoryState = (inventoryData) => {
    setInventory(inventoryData);
    console.log("inventoryData", inventoryData);
    setIsOutOfStock(inventoryData && Number(inventoryData.quantity) <= 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { resData, inventoryData } = await fetchProductAndInventory(id);
        updateProductState(resData);
        updateInventoryState(inventoryData);
      } catch (error) {
        console.error("Failed to fetch product and inventory data", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setIsInCart(cartItems.some((item) => item.productId == id));
  }, [cartItems, id]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchInventoryById = async (productId) => {
    try {
      const response = await axiosInstance.get(
        `/inventory/getById/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch inventory", error);
      throw new Error("Failed to fetch inventory data");
    }
  };

  const addProductCart = async () => {
    if (isInCart) {
      ShowToast("error", "Product is already in cart");
      return;
    }

    try {
      setStopBtn(true);
      setIsLoading(true);
      const datatoSend = {
        userId: user?.userId || user?.sub,
        companyId: Number(compId),
        products: [
          {
            productId: Number(id),
            quantity: formatNumber(1),
          },
        ],
      };

      setIsInCart(true);
      setCartCount((prevCount) => prevCount + 1);
      updateLocalCartItems(Number(id));

      const response = await axiosInstance.post(`/cart/create`, datatoSend);
      if (response.status >= 200 && response.status < 300) {
        ShowToast("success", "Successfully added to cart");
      } else {
        setIsInCart(false);
        // setCartCount((prevCount) => prevCount - 1);
        updateLocalCartItems(Number(id), true);
        ShowToast("error", "Failed to add product to cart");
      }
    } catch (error) {
      setIsInCart(false);
      // setCartCount((prevCount) => prevCount - 1);
      updateLocalCartItems(Number(id), true);
      ShowToast("error", "An error occurred while adding to cart");
    } finally {
      setStopBtn(false);
      setIsLoading(false);
    }
  };

  const handleNotifyMe = () => {
    ShowToast(
      "success",
      "You will be notified when the product is back in stock."
    );
  };

  const handleCheckout = () => {
    if (!isOutOfStock) {
      // console.log("Product before navigation:", product);
      navigate("/checkout", {
        state: { productData: { ...product, ...inventory } },
      });
    }
  };

  const handleImageSelection = (img) => {
    setSelectedImage(img);
  };

  const debouncedImageSelection = _.debounce(handleImageSelection, 100);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] bg-transparent">
        <p className="text-xl font-semibold text-black animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const buttonsFun = () => (
    <>
      {!isOutOfStock ? (
        <>
          <button
            className={`flex-1 px-4 py-3 carrtBtn ${
              isInCart
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-ExtraDarkColor text-white hover:bg-DarkColor"
            } font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 text-base`}
            onClick={addProductCart}
            disabled={isInCart || stopBtn}
            // style={{
            //   cursor: `url(${CartPNG}) 16 16, auto`,
            // }}
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
                  className="w-6 h-6 text-white"
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
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      from="0 28 28"
                      to="28 28 28"
                      dur="0.5s"
                      fill="freeze"
                    />
                  </path>
                </svg>
                <span className="ml-2">In Cart</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      from="0 100 100"
                      to="100 100 100"
                      dur="0.5s"
                      fill="freeze"
                    />
                  </path>
                </svg>
                <span className="ml-2 carrtBtn">Add to Cart</span>
              </span>
            )}{" "}
          </button>
          <button
            className="flex-1 px-4 py-3 buyNowBtn bg-white text-black border border-black font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 text-sm"
            onClick={handleCheckout}
          >
            Buy Now
          </button>
        </>
      ) : (
        <button
          className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 text-sm"
          onClick={handleNotifyMe}
        >
          Notify Me
        </button>
      )}
    </>
  );
  const notUserButton = () => (
    <>
      <Popover
        content={content}
        trigger="click"
        className="w-full flex gap-4 items-center justify-center drop-shadow-2xl"
        overlayInnerStyle={{ borderRadius: "0.5rem" }}
      >
        <button className="flex-1 px-4 py-3 font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 text-base bg-ExtraDarkColor text-white hover:bg-DarkColor">
          Add to Cart
        </button>
      </Popover>

      <Popover
        content={content}
        trigger="click"
        className="w-full flex gap-4 items-center justify-center drop-shadow-2xl"
        overlayInnerStyle={{ borderRadius: "0.5rem" }}
      >
        <button className="flex-1 px-4 py-3 bg-white text-black border border-black font-semibold rounded-lg shadow-lg transition-transform transform hover:scale-105 text-sm">
          Buy Now
        </button>
      </Popover>
    </>
  );

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    if (!product.description) return "No description available!";

    if (product.description.length <= MAX_DESCRIPTION_LENGTH) {
      return parse(product.description);
    }

    if (showFullDescription) {
      return (
        <>
          {product.description}
          <button
            onClick={toggleDescription}
            className="text-blue-500 hover:underline ml-2"
          >
            Show Less
          </button>
        </>
      );
    }

    return (
      <>
        {product.description.slice(0, MAX_DESCRIPTION_LENGTH)}...
        <button
          onClick={toggleDescription}
          className="text-blue-500 hover:underline ml-2"
        >
          Show More
        </button>
      </>
    );
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-transparent text-black p-4 pt-0 sm:p-6 md:p-8 lg:p-12 mt-2 sm:mt-8 ">
      <div className="flex flex-col lg:flex-row justify-center lg:gap-10">
        <div className="flex flex-col items-center sticky bottom-0 left-0 right-0 lg:items-start xl:flex-row-reverse gap-4 lg:gap-8 w-full lg:w-auto">
          <div className="sticky top-48 flex flex-col lg:items-start xl:flex-row-reverse gap-4 lg:gap-8">
            <div className="rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden">
              <Magnifier
                src={`${BASE_URL}/${selectedImage}`}
                width={isSmallScreen ? 350 : 550}
                height={isSmallScreen ? 350 : 550}
                // mgShape="square"
                mgWidth={200}
                mgHeight={200}
                zoomFactor={1.25}
                alt="Product Image"
                className="rounded-lg overflow-hidden object-cover"
                style={{
                  objectFit: "cover",
                  display: "block",
                  cursor: "crosshair",
                  height: "100%",
                }}
              />
            </div>

            <div className="flex xl:flex-col gap-3 overflow-hidden p-2 overflow-x-auto hideScroll lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[550px] w-full lg:w-auto ">
              {product.images &&
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}/${img}`}
                    alt={product.productName}
                    className={`h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-lg object-cover cursor-pointer hover:scale-110 transition-all duration-300 ${
                      selectedImage === img
                        ? "border-4 border-black transform scale-110"
                        : "border border-gray-300"
                    }`}
                    onMouseEnter={() => debouncedImageSelection(img)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:ml-8 max-w-xl flex flex-col">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            {product.productName}
          </h1>
          <div className="flex items-center mb-4 sm:mb-6">
            {Array(4)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="text-black text-lg sm:text-xl" />
              ))}
            <PiStarDuotone className="text-black text-lg sm:text-xl" />
            <p className="ml-2 text-gray-500 text-sm sm:text-base">
              (149 reviews)
            </p>
          </div>

          <div className="flex items-center space-x-2 lg:md:space-x-4 mb-4 sm:mb-6">
            <div
              className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                isOutOfStock ? "text-red-500" : "text-black"
              }`}
            >
              {!isOutOfStock ? `रु ${product.offerPrice}` : "Out of Stock"}
            </div>
            {!isOutOfStock && (
              <div className="text-gray-500 text-lg sm:text-xl line-through">
                {product.sellingPrice}
              </div>
            )}

            <div className="flex items-center">
              <button
                className={`text-xl sm:text-2xl  ${
                  "  " ? "text-red-500" : "text-gray-500"
                }`}
              >
                {/* <FaHeart /> */}
              </button>
            </div>
          </div>

          <p className="text-gray-700 text-base sm:text-lg">
            {/* {product.description || "No description available!"} */}
            {/* {console.log("renderDescription()", renderDescription())} */}
            {renderDescription()}
          </p>

          <div className="sm:hidden mt-6 sticky bottom-0 left-0 right-0 bg-white p-4">
            <div className="flex space-x-4">
              {!user ? <>{notUserButton()}</> : <>{buttonsFun()}</>}
            </div>
          </div>

          <div className="hidden sm:block lg:hidden sticky bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
            <div className="flex space-x-4">
              {!user ? <>{notUserButton()}</> : <>{buttonsFun()}</>}
            </div>
          </div>

          <div className="hidden lg:block mt-6 ">
            <div className="flex space-x-4">
              {!user ? <>{notUserButton()}</> : <>{buttonsFun()}</>}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default ProductDescription;
