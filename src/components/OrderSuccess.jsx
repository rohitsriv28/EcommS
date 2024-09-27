import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuthContext();

  useEffect(() => {
    if (!location.state) {
      navigate("/", { replace: true });
      return;
    }

    if (!user) {
      navigate("/", { replace: true });
      return;
    }
  }, [location, user]);

  const { bills = [] } = location.state?.orderData || {};

  if (bills.length === 0) {
    return <p>No order details available. Redirecting...</p>;
  }

  const bill = bills[0];
  const details = bills[1]?.detailsResult || [];

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div
        id="invoice-container"
        className="max-w-2xl w-full border border-black p-6 shadow-lg"
      >
        <div className="flex justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-black">Order Invoice</h1>
            <p className="text-black">{bill.voucherNo}</p>
            <p className="text-black">Date:- {formatDate(bill.date)}</p>
          </div>
          <div>
            <p className=" font-bold text-black">
              Order Status: {bill.orderStatus}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-black">Billing Address</h2>
          <p className="text-black">{bill.billingAddress}</p>
        </div>

        <table className="w-full text-left mb-4 border-collapse">
          <thead>
            <tr>
              <th className="border-b border-black py-2 text-black">
                Products
              </th>
              <th className="border-b border-black py-2 text-black">
                Quantity
              </th>
              <th className="border-b border-black py-2 text-black">
                Price Per Unit
              </th>
              <th className="border-b border-black py-2 text-black">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {details &&
              details.map((item) => (
                <tr key={item.id}>
                  <td className="border-b border-black py-2 text-black">
                    {item.productName || item.productId}
                  </td>
                  <td className="border-b border-black py-2 text-black">
                    {parseFloat(item?.quantity)?.toFixed(2)}
                  </td>
                  <td className="border-b border-black py-2 text-black">
                    ₹{parseFloat(item?.pricePerUnit)?.toFixed(2)}
                  </td>
                  <td className="border-b border-black py-2 text-black">
                    ₹{parseFloat(item?.totalPrice)?.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-black">Subtotal:</p>
            <p className="text-black">Discount:</p>
            <p className="text-black">Tax:</p>
            <p className="text-black font-bold">Total:</p>
          </div>
          <div className="text-right">
            <p className="text-black">₹{bill.subTotal.toFixed(2)}</p>
            <p className="text-black">
              ₹{bill.discAmt.toFixed(2)} ({bill.discPc}%)
            </p>
            <p className="text-black">₹{bill.taxAmount.toFixed(2)}</p>
            <p className="text-black font-bold">₹{bill.netTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-black">
            <strong>Payment Method:</strong> {bill.paymentOption}
          </p>
          <p className="text-black">
            <strong>Amount in Words:</strong> {bill.inWords}
          </p>
        </div>

        <div className="flex justify-end space-x-4 mt-6 no-print">
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={() => window.print()}
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
