import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const Payment = ({
  paymentMethod,
  handlePaymentChange,
  activeSection,
  toggleSection,
}) => (
  <div>
    <div
      className="bg-ExtraDarkColor text-white p-4 rounded-md cursor-pointer flex justify-between items-center"
      onClick={toggleSection}
    >
      Payment Methods
      {activeSection ? <FaCaretUp /> : <FaCaretDown />}
    </div>
    <div className={`transition-height ${activeSection ? "h-auto" : "h-0"}`}>
      {activeSection && (
        <div className="space-y-2 mt-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="COD"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={handlePaymentChange}
              className="mr-2"
              style={{ accentColor: "black" }}
            />
            <label htmlFor="COD" className="text-lg font-bold text-DarkColor">
              Cash on Delivery (CoD)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="Wallet"
              name="paymentMethod"
              value="Wallet"
              checked={paymentMethod === "Wallet"}
              onChange={handlePaymentChange}
              className="mr-2"
              style={{ accentColor: "black" }}
            />
            <label
              htmlFor="Wallet"
              className="text-lg font-bold text-DarkColor"
            >
              eSewa
            </label>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Payment;
