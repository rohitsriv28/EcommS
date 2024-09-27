import React, { useRef, useEffect, useCallback, useState } from "react";
import { RxCross1, RxTrash } from "react-icons/rx";
import CartProducts from "../layouts/CartProducts";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useAuthContext from "../context/useAuthContext";
import NotLoggedInPage from "./NotLoggedInPage";
import CustomPopover from "./CustomPopover";

const Cart = ({ setShowCart }) => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <div className="bg-[rgba(0,0,0,0.5)] w-full min-h-screen fixed left-0 top-0 z-[1000] overflow-y-auto">
        <div className="max-w-[500px] w-full min-h-full bg-white absolute right-0 top-0 p-6 rounded-lg shadow-lg">
          <RxCross1
            className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer text-black hover:text-gray-700 transition-colors"
            onClick={() => setShowCart(false)}
          />
          <NotLoggedInPage />
        </div>
      </div>
    );
  }

  const {
    cartItems,
    inventoryData,
    updateItemQuantity,
    removeItem,
    cartTotal,
    fetchCartData,
    loading,
    emptyCart,
    cartCount,
  } = useCart();
  let cc = cartCount < 0 ? 0 : cartCount;

  const location = useLocation();
  const currentPath = location.pathname;

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0 && selectedProducts.length === 0) {
      if (currentPath === "/checkout") {
        console.log(localStorage.getItem("selectedProducts"));
        const selectedProductsFromCheckout =
          localStorage.getItem("selectedProducts");
        const productsArray = selectedProductsFromCheckout
          ? selectedProductsFromCheckout.split(",")
          : [];
        setSelectedProducts(productsArray);
      } else {
        const allProductIds = cartItems.map((item) => item.id);
        setSelectedProducts(allProductIds);
      }
    }
  }, [cartItems, currentPath]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      alert("Please select products to checkout");
      return;
    }
    localStorage.setItem("selectedProducts", selectedProducts.join(","));
    navigate("/checkout", { state: { selectedProducts } });
    setShowCart(false);
  };

  const cartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCart]);

  const fetchCart = useCallback(() => {
    fetchCartData();
  }, [fetchCartData]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleEmpty = () => {
    emptyCart();
    setIsPopoverOpen(false);
  };

  const content = (
    <>
      <div className="px-3 py-2 w-max">
        {cartItems.length !== 0 ? (
          <>
            <p className="font-semibold mb-2 text-gray-800">Clear the Cart?</p>
            <p className="text-sm text-gray-600">
              This action cannot be undone!
            </p>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition-colors w-full"
              onClick={handleEmpty}
              disabled={cartItems.length === 0}
            >
              Continue
            </button>
          </>
        ) : (
          "Nothing here"
        )}
      </div>
    </>
  );

  return (
    <div className="bg-[rgba(0,0,0,0.5)] w-full min-h-[100dvh] fixed left-0 top-0 z-[99999] overflow-y-auto hideScroll">
      <div
        ref={cartRef}
        className="max-w-[500px] w-full min-h-full bg-white absolute right-0 top-0 p-6 pb-0 shadow-lg"
      >
        <div className="sticky top-0 bg-white z-50">
          <div className="relative flex justify-between">
            <CustomPopover
              content={content}
              trigger="click"
              className="absolute top-0 right-10"
              isOpen={isPopoverOpen}
              setIsOpen={setIsPopoverOpen}
            >
              <RxTrash className="my-6 text-[24px] cursor-pointer text-black hover:text-gray-700 transition-colors" />
            </CustomPopover>
            <RxCross1
              className="absolute top-0 right-0 my-6 text-[24px] cursor-pointer text-black hover:text-gray-700 transition-colors"
              onClick={() => setShowCart(false)}
            />
          </div>
          <div className="flex items-center gap-4">
            <h3 className="pt-6 text-lg font-semibold text-black uppercase tracking-wide">
              Your Cart
            </h3>
            <div className="bg-red-600 w-[24px] h-[22px] mt-6 rounded-full text-white text-sm grid place-items-center">
              {cc}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-xl font-semibold text-black animate-pulse h-[80vh] flex items-center justify-center">
            Loading...
          </p>
        ) : (
          <>
            <div className="mt-6 space-y-4 min-h-[78vh]">
              {cartItems.length === 0 ? (
                <div className="min-h-[75vh] flex items-center justify-center text-gray-500">
                  Continue Shopping to See Me {":)"}
                </div>
              ) : (
                cartItems.map((item) => (
                  <CartProducts
                    key={item.id}
                    item={item}
                    inventoryItem={inventoryData[item.productId]}
                    onQuantityChange={updateItemQuantity}
                    onRemove={removeItem}
                    isSelected={selectedProducts.includes(item.id)}
                    onSelectProduct={handleSelectProduct}
                  />
                ))
              )}
            </div>
            <div className="sticky bottom-0 bg-white pb-2">
              <div className="flex justify-between mt-6 border-t pt-4">
                <h3 className="font-medium text-base text-gray-800">Total:</h3>
                <p className="font-bold text-xl text-black">
                  रु {cartTotal(selectedProducts).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-black text-white w-full py-2 font-medium  hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={selectedProducts.length === 0}
                >
                  CheckOut
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
