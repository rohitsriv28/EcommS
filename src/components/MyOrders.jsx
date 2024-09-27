import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { axiosInstance } from "../config/Axios";
import {
  FiGrid,
  FiShoppingBag,
  FiX,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiCreditCard,
  FiPrinter,
  FiPackage,
} from "react-icons/fi";
import { BASE_URL } from "../api/base.api";
import { ShowToast } from "./CustomToast";
import { Toaster } from "react-hot-toast";
// import { FiPackage } from "react-icons/fi";

const OrderCard = React.memo(({ order, onClick }) => {
  const getProductImages = (order) => {
    return order.salesDetails
      .map((detail) => ({
        src: `${BASE_URL}/${detail.product.images.split(",")[0]}`,
        alt: detail.product.productName,
      }))
      .filter(
        (img, index, self) => index === self.findIndex((t) => t.src === img.src)
      )
      .slice(0, 4);
  };

  const productImages = getProductImages(order);

  const renderImages = () => {
    const imageCount = productImages.length;

    if (imageCount === 0) {
      return (
        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
          No Image
        </div>
      );
    }

    if (imageCount === 1) {
      return (
        <div className="w-full h-full">
          <img
            src={productImages[0].src}
            alt={productImages[0].alt}
            className="w-full h-full object-contain mix-blend-multiply rounded-md"
          />
        </div>
      );
    }

    const gridClass =
      imageCount === 2
        ? "grid-cols-2"
        : imageCount === 3
        ? "grid-cols-3"
        : "grid-cols-2 grid-rows-2";

    return (
      <div className={`grid ${gridClass} gap-2 h-full`}>
        {productImages.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group shadow-lg border border-gray-200"
      onClick={() => onClick(order)}
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {renderImages()}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <FiChevronRight className="text-white w-16 h-16" />
        </motion.div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-black">#{order.billNo}</h2>
          <span className="px-2 py-1 bg-gray-200 rounded-full text-xs font-semibold text-black">
            {order.orderStatus}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-1">
          <FiPackage className="mr-1" />
          <span>{order.salesDetails.length} items</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <FiCalendar className="mr-1" />
          <span>{new Date(order.date).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-black">
            ₹{parseFloat(order.netTotal).toFixed(2)}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 bg-white text-black border-2 border-black rounded-full font-semibold text-xs transition-colors duration-300"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});

const OrderDetail = ({ order, onClose }) => {
  const componentRef = useRef();
  //   const handlePrintClick = () => {
  //     if (componentRef.current) {
  //       componentRef.current.handlePrint();
  //     }
  //   };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative text-black shadow-2xl"
      >
        <button
          onClick={() => {
            ShowToast("error", "No Printer, No Print!?");
          }}
          //   onClick={handlePrintClick}
          className=" absolute top-6 right-12 mr-4 text-gray-500 hover:text-black transition-colors duration-200"
          title="Print Invoice"
        >
          <FiPrinter size={24} />
          {/* <ReactToPrint
            trigger={() => (
              <button className="p-2 text-gray-500 hover:text-black transition-colors duration-200">
                Print
              </button>
            )}
            content={() => componentRef.current}
          /> */}
        </button>

        {/* <button
          onClick={() => {
            if (componentRef.current) {
              componentRef.current.handlePrint();
            }
          }}
          className="btn btn-primary"
        >
          Print Invoice
        </button> */}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-black transition-colors duration-200"
        >
          <FiX size={28} />
        </button>
        <div>
          {/* <ReactToPrint
            trigger={() => <button style={{ display: "none" }}></button>}
            content={() => componentRef.current}
            ref={componentRef}
          />
          <PrintInvoice order={order} ref={componentRef} />{" "} */}
        </div>
        <h2 className="text-4xl font-bold mb-6 pb-4 border-b-2 border-gray-200">
          Order #{order.billNo}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center">
            <FiCalendar className="text-gray-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FiClock className="text-gray-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-semibold">{order.orderStatus}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FiCreditCard className="text-gray-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-500">Payment</p>
              <p className="font-semibold">{order.paymentOption}</p>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Items</h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          {order.salesDetails.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center">
                <img
                  src={`${BASE_URL}/${item?.product?.images?.split(",")[0]}`}
                  alt={item.product?.productName || "Product"}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <span className="font-medium">{item.product.productName}</span>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ₹{parseFloat(item.pricePerUnit).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {Number(item?.quantity)?.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                ₹{parseFloat(order.subTotal).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount ({order.discPc}%)</span>
              <span className="font-medium text-green-600">
                -₹{parseFloat(order.discAmt).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({order.tax}%)</span>
              <span className="font-medium">
                ₹{parseFloat(order.taxAmount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-gray-300">
              <span>Total</span>
              <span>₹{parseFloat(order.netTotal).toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm italic mt-4 text-gray-500">{order.inWords}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(
        "/sales-entry/findByUser?companyId=1"
      );
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const memoizedOrders = useMemo(() => orders, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-180px)] bg-transparent">
        <p className="text-xl font-semibold text-black animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-white text-black">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">My Orders</h1>
          <div className="flex space-x-4">
            <button
              title="View in Grid"
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full ${
                viewMode === "grid" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              <FiGrid size={24} />
            </button>
            <button
              title="View in List"
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full ${
                viewMode === "list" ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              <FiShoppingBag size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {memoizedOrders.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-xl mt-12"
            >
              No orders found.
            </motion.p>
          ) : viewMode === "grid" ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {memoizedOrders.map((order) => (
                <OrderCard
                  key={order.billNo}
                  order={order}
                  onClick={setSelectedOrder}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div layout className="space-y-4">
              {memoizedOrders.map((order) => (
                <motion.div
                  key={order.billNo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 flex items-center"
                  onClick={() => setSelectedOrder(order)}
                >
                  <img
                    src={`${BASE_URL}/${
                      order.salesDetails[0]?.product?.images?.split(",")[0]
                    }`}
                    alt={
                      order.salesDetails[0]?.product?.productName || "Product"
                    }
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">
                      Order #{order.billNo}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                    <p className="mt-1">
                      Total: ₹{parseFloat(order.netTotal).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {order.orderStatus}
                    </p>
                  </div>
                  <FiChevronRight className="text-gray-400 w-6 h-6" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedOrder && (
            <OrderDetail
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </AnimatePresence>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default MyOrders;
