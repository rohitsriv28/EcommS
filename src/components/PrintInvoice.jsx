import React, { forwardRef } from "react";
import ReactToPrint from "react-to-print";

const PrintInvoice = forwardRef(({ order }, ref) => {
  return (
    <div ref={ref}>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-xl">Order #{order.billNo}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <p className="font-bold">Date:</p>
            <p>{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <p>{order.orderStatus}</p>
          </div>
          <div>
            <p className="font-bold">Payment Method:</p>
            <p>{order.paymentOption}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Quantity</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.salesDetails.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">{item.product.productName}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">
                  ₹{parseFloat(item.pricePerUnit).toFixed(2)}
                </td>
                <td className="text-right py-2">
                  ₹{(item.quantity * parseFloat(item.pricePerUnit)).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{parseFloat(order.subTotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount ({order.discPc}%):</span>
              <span>-₹{parseFloat(order.discAmt).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax ({order.tax}%):</span>
              <span>₹{parseFloat(order.taxAmount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t-2 border-gray-300 pt-2">
              <span>Total:</span>
              <span>₹{parseFloat(order.netTotal).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm italic text-gray-600">{order.inWords}</p>
      </div>
    </div>
  );
});

export default PrintInvoice;
