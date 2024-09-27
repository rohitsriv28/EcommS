import React, { useState, useEffect } from "react";
import { RxCross1, RxMinus, RxPlus } from "react-icons/rx";
import { BASE_URL } from "../api/base.api";

const CartProducts = ({
  item,
  inventoryItem,
  onQuantityChange,
  onRemove,
  isSelected,
  onSelectProduct,
}) => {
  const [localQuantity, setLocalQuantity] = useState(
    parseFloat(item?.quantity)
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLocalQuantity(parseFloat(item?.quantity));
  }, [item.quantity]);

  const handleIncrement = () => {
    const newQuantity = localQuantity + 1;
    if (inventoryItem && newQuantity <= parseFloat(inventoryItem?.quantity)) {
      setLocalQuantity(newQuantity);
      onQuantityChange(item?.id, newQuantity, item.productId);
      setErrorMessage("");
    } else {
      setErrorMessage(`Ooops...The product went out of stock`);
    }
  };

  const handleDecrement = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity, item.productId);
      setErrorMessage("");
    }
  };

  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.id);
    } finally {
      setIsRemoving(false);
    }
  };

  const availableQuantity = inventoryItem
    ? Math.min(localQuantity, parseFloat(inventoryItem?.quantity))
    : localQuantity;

  const totalPrice = (
    parseFloat(item.product?.offerPrice) * availableQuantity
  ).toFixed(2);

  const MAX_NAME_LENGTH = 22;
  const truncatedProductName =
    item?.product?.productName?.length > MAX_NAME_LENGTH
      ? `${item?.product?.productName?.substring(0, MAX_NAME_LENGTH)}...`
      : item?.product?.productName;

  return (
    <div className="flex flex-col border-b py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelectProduct(item.id)}
            className="cursor-pointer"
            style={{accentColor: "black"}}
          />

          <img
            className="h-[80px] w-[80px] object-contain rounded-lg shadow-md"
            src={
              item?.product?.images && item?.product?.images?.length > 0
                ? `${BASE_URL}/${item?.product?.images?.split(",")[0]}`
                : "/path/to/default/image.jpg"
            }
            alt={truncatedProductName}
          />
          <div className="space-y-2">
            <h3 className="font-medium text-lg text-gray-900 truncate">
              {truncatedProductName}
            </h3>
            <p className="text-gray-700 text-sm">
              Price: रु {parseFloat(item?.product?.offerPrice)?.toFixed(2)}
            </p>
            {localQuantity > 1 && (
              <p className="text-gray-700 text-sm">Total: रु {totalPrice}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center bg-white">
          <div className="flex items-center mb-2 space-x-2">
            <button
              onClick={handleDecrement}
              className={`text-xl p-2 rounded-full bg-gray-300 ${
                localQuantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={localQuantity <= 1}
            >
              <RxMinus />
            </button>
            <div className="bg-gray-200 text-black rounded-full w-12 h-12 flex items-center justify-center text-lg">
              {availableQuantity}
            </div>
            <button
              onClick={handleIncrement}
              className={`text-xl p-2 rounded-full bg-gray-300 ${
                inventoryItem &&
                localQuantity >= parseFloat(inventoryItem?.quantity)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <RxPlus />
            </button>
          </div>
          <button
            onClick={handleRemove}
            className={`text-red-500 mt-2 w-6 h-6 flex items-center justify-center ${
              isRemoving ? "animate-spin" : ""
            }`}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <svg
                className="animate-spin h-5 w-5 text-red-500"
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
            ) : (
              <RxCross1 />
            )}
          </button>
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-4 text-center">
          <span className=" bg-red-200 p-2 px-3 rounded-xl">
            {errorMessage}
          </span>
        </p>
      )}
    </div>
  );
};

export default CartProducts;
