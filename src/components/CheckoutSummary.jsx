import React from "react";
import { useCart } from "../context/CartContext";
import { BASE_URL } from "../api/base.api";
import defaultImage from "../assets/img/staticImage.png";

const formatDate = (date) => {
  const options = { day: "2-digit", month: "short" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

const CheckoutSummary = ({ directBuy, selectedProducts }) => {
  // console.log("selectedProducts", selectedProducts);
  const { cartItems, inventoryData } = useCart();

  const today = new Date();
  const date2DaysFromNow = new Date(today);
  date2DaysFromNow.setDate(today.getDate() + 2);

  const date5DaysFromNow = new Date(today);
  date5DaysFromNow.setDate(today.getDate() + 5);

  const deliveryStartDate = formatDate(date2DaysFromNow);
  const deliveryEndDate = formatDate(date5DaysFromNow);

  const totalMRP = directBuy
    ? parseFloat(directBuy?.sellingPrice)
    : selectedProducts.reduce((total, item) => {
        const itemMRP =
          parseFloat(item?.product?.sellingPrice) * parseFloat(item?.quantity);
        return total + itemMRP;
      }, 0);

  const totalDiscount = directBuy
    ? parseFloat(directBuy?.sellingPrice) - parseFloat(directBuy?.offerPrice)
    : selectedProducts.reduce((total, item) => {
        const itemDiscount =
          (parseFloat(item?.product?.sellingPrice) -
            parseFloat(item?.product?.offerPrice)) *
          parseFloat(item?.quantity);
        return total + itemDiscount;
      }, 0);

  const totalAmount = totalMRP - totalDiscount;
  const shippingFee = totalAmount > 299 ? 0 : 49;
  const finalAmount = totalAmount + shippingFee;

  return (
    <div className="py-4 w-full mx-auto">
      <h2 className="font-semibold text-xl mb-4 text-left">
        DELIVERY ESTIMATES
      </h2>
      {selectedProducts &&
        !directBuy &&
        selectedProducts.map((item, index) => {
          const inventoryItem = inventoryData[item?.productId];
          const availableQuantity = inventoryItem
            ? parseFloat(inventoryItem.quantity)
            : 0;
          const isOutOfStock = item.quantity > availableQuantity;

          return (
            <div key={index} className="flex items-center mb-4">
              <img
                src={`${BASE_URL}/${
                  item?.product?.images?.split(",")[0] || defaultImage
                }`}
                alt={"Product Image"}
                className="w-16 h-16 object-contain mr-4"
              />
              <div>
                <p className="text-sm">{item.productName}</p>
                <p className="text-sm">
                  Delivery between{": "}
                  <strong>
                    {deliveryStartDate} - {deliveryEndDate}
                  </strong>
                </p>
                <p className="text-sm">Quantity: {item?.quantity}</p>
                {isOutOfStock && (
                  <p className="text-red-500 text-sm">
                    Oops product runs out of stock !!!
                  </p>
                )}
              </div>
            </div>
          );
        })}

      {directBuy && (
        <>
          <div className="flex items-center mb-4">
            <img
              src={`${BASE_URL}/${
                directBuy?.product?.images?.split(",")[0] || defaultImage
              }`}
              alt={"Product Image"}
              className="w-16 h-16 object-contain mr-4"
            />
            <div>
              <p className="text-sm font-semibold">{directBuy.productName}</p>
              <p className="text-sm">
                Delivery between:{" "}
                <strong>
                  {deliveryStartDate} - {deliveryEndDate}
                </strong>
              </p>
              <p className="text-sm">
                Quantity:{" "}
                <span className="font-bold">{parseFloat(1).toFixed(2)}</span>
              </p>
            </div>
          </div>
        </>
      )}
      <h2 className="font-semibold text-xl mb-4 text-left">
        PRICE DETAILS ({selectedProducts?.length} Items)
      </h2>
      <div className="mb-2 text-left">
        <p className="flex justify-between">
          <span>Total MRP</span>
          <span>₹{totalMRP?.toFixed(2)}</span>
        </p>
      </div>
      <div className="mb-2 text-left">
        <p className="flex justify-between">
          <span>Discount on MRP</span>
          <span className="text-green-500">₹{totalDiscount?.toFixed(2)}</span>
        </p>
      </div>
      <div className="mb-2 text-left">
        <p className="flex justify-between">
          <span>Shipping Fee</span>
          <span
            className={shippingFee === 0 ? "text-green-500" : "text-red-500"}
          >
            {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
          </span>
        </p>
      </div>
      <hr className="my-4" />
      <div className="font-semibold text-lg mb-4 text-left">
        <p className="flex justify-between">
          <span>Total Amount</span>
          <span>₹{finalAmount?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
