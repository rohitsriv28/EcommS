import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/Axios";
import useAuthContext from "../context/useAuthContext";
import { useCart } from "../context/CartContext";
import Address from "./AddressForm";
import Payment from "./PaymentMode";
import CheckoutSummary from "./CheckoutSummary";
import OrderButton from "./OrderButton";
import { ShowToast } from "./CustomToast";
import { Toaster } from "react-hot-toast";

const CheckoutPage = () => {
  const { user } = useAuthContext();
  const { cartItems, inventoryArray, emptyCart } = useCart();
  const navigate = useNavigate();
  const loco = useLocation();

  const { selectedProducts } = loco.state || {};
  // console.log("selectedProducts", selectedProducts);

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (
      selectedProducts &&
      selectedProducts.length > 0 &&
      cartItems.length > 0
    ) {
      const filtered = cartItems.filter((item) =>
        selectedProducts.includes(item.id)
      );
      // console.log("filtered",filtered)
      setFilteredItems(filtered);
    }
  }, [selectedProducts, cartItems]);


  // useEffect(()=>{
    // console.log("filteredItems",filteredItems)

  // },[filteredItems])

  // if (!selectedProducts || selectedProducts.length === 0) {
  //   return <p>No products selected for checkout.</p>;
  // }

  const [directBuy, setDirectBuy] = useState();

  useState(() => {
    if (loco?.state?.productData) {
      setDirectBuy(loco?.state?.productData);
    } else {
      navigate("/", { replace: true, state: null });
    }
  }, [loco, navigate]);

  if (!user) {
    navigate("/", { replace: true });
    return null;
  }

  const [formData, setFormData] = useState({
    name: `${user?.firstName} ${user?.lastName}` || "",
    phone: user?.phone || "",
    email: user?.email || "",
    houseNo: user?.houseNoAreaStreet || "",
    landmark: user?.landmark || "",
    cityTown: user?.cityTown || "",
    state: user?.state || "",
    pinCode: user?.pinCode || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [activeSections, setActiveSections] = useState({
    address: true,
    payment: true,
  });

  const [errors, setErrors] = useState({
    address: "",
    payment: "",
  });

  // console.log("cartItems", cartItems);

  const toggleSection = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...(name === "state" ? { cityTown: "" } : {}),
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const validateForm = () => {
    let valid = true;
    let addressError = "";
    let paymentError = "";

    if (
      !formData.houseNo ||
      !formData.landmark ||
      !formData.cityTown ||
      !formData.state
    ) {
      addressError = "Please fill all address fields.";
      valid = false;
    }

    if (!paymentMethod) {
      paymentError = "Please select a payment method.";
      valid = false;
    }

    setErrors({
      address: addressError,
      payment: paymentError,
    });

    return valid;
  };

  const handleOrderSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      let total = 0;
      let discAmt = 0;
      let inventoryIssue = false;

      const products = filteredItems
        .map((item) => {
          // console.log("first",item)
          const inventoryItem = inventoryArray.find(
            (inv) => inv.productId === item.productId
          );
          const itemTotal =
            parseFloat(item.product.offerPrice) * parseFloat(item.quantity);
          const itemDiscAmt =
            (parseFloat(item.product.sellingPrice) -
              parseFloat(item.product.offerPrice)) *
            parseFloat(item.quantity);

          total += itemTotal;
          discAmt += itemDiscAmt;

          if (
            inventoryItem?.quantity <= 0 ||
            inventoryItem?.quantity < Number(item.quantity)
          ) {
            inventoryIssue = true;
            return null;
          }

          return {
            productId: item.productId,
            categoryId: inventoryItem?.product?.categoryId || 0,
            brandId: inventoryItem?.product?.brandId || 0,
            quantity: parseFloat(item.quantity).toFixed(4),
            unitId: inventoryItem?.product?.unitId || 1,
            pricePerUnit: parseFloat(item.product.offerPrice).toFixed(2),
            totalPrice: itemTotal.toFixed(2),
            status: true,
            updatedTimes: 0,
            companyId: item.companyId || 1,
          };
        })
        .filter((product) => product !== null);

      if (inventoryIssue) {
        ShowToast(
          "error",
          "Some items are out of stock, try changing quantities in the cart."
        );
        return;
      }

      const orderData = {
        userId: parseInt(user?.sub || user?.userId),
        date: new Date().toISOString().split("T")[0],
        miti: "",
        billingAddress: `${formData.houseNo}, ${formData.landmark}, ${formData.cityTown}, ${formData.state}`,
        note: "",
        fiscalYear: "2080/81",
        paymentOption: paymentMethod,
        orderStatus: "Placed",
        discPc: 0,
        tax: 0,
        products: directBuy
          ? [
              {
                productId: directBuy.productId,
                categoryId: directBuy?.product?.categoryId || 0,
                brandId: directBuy?.product?.brandId || 0,
                quantity: parseFloat(1).toFixed(4),
                unitId: directBuy?.product?.unitId || 1,
                pricePerUnit: parseFloat(directBuy.offerPrice).toFixed(2),
                totalPrice: parseFloat(directBuy.product.sellingPrice).toFixed(
                  2
                ),
                status: true,
                updatedTimes: 0,
                companyId: directBuy.product.companyId || 1,
              },
            ]
          : products,
      };

      const response = await axiosInstance.post(
        "/sales-entry/create",
        orderData
      );

      if (response.status >= 200 && response.status < 300) {
        if (!directBuy) {
          emptyCart(filteredItems);
        }
        navigate("/order-success", {
          replace: true,
          state: { orderData: response?.data, productData: null },
        });
      }

      // console.log("orderData", orderData);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="bg-PrimaryColor min-h-[calc(100vh-180px)] p-4 sm:p-6 flex justify-center">
      <div className="w-full mt-6 sm:mt-10 max-w-screen-xl flex flex-col lg:flex-row">
        <div className="flex flex-col w-full space-y-4 sm:space-y-6">
          <div className="flex flex-col gap-20 lg:flex-row w-full lg:space-x-6">
            <div className="w-full lg:w-2/3 space-y-4 sm:space-y-6">
              <Address
                formData={formData}
                handleChange={handleChange}
                activeSection={activeSections.address}
                toggleSection={() => toggleSection("address")}
                user={user}
                setFormData={updateFormData}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}

              <Payment
                paymentMethod={paymentMethod}
                handlePaymentChange={handlePaymentChange}
                activeSection={activeSections.payment}
                toggleSection={() => toggleSection("payment")}
              />
              {errors.payment && (
                <p className="text-red-500 text-sm">{errors.payment}</p>
              )}
            </div>
            <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
              <CheckoutSummary
                cartItems={filteredItems}
                directBuy={directBuy}
                selectedProducts={filteredItems}
              />
              <div className="w-full items-center justify-center flex">
                <button
                  className="bg-black orderNowBtn text-white w-full py-2 font-medium  hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed rounded-lg"
                  onClick={handleOrderSubmit}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default CheckoutPage;
