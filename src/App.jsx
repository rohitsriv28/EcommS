import React, { useEffect, useState } from "react";
import "./App.css";
import "aos/dist/aos.css";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { store } from "./Redux/Store";
import { axiosInstance } from "./config/Axios";
import useAuthContext from "./context/useAuthContext";
import Loader from "./components/utils/loader";
import Layout from "./layouts/layout";
import MainPage from "./components/page/MainPage";
import Login from "./components/registration/Login";
import Signup from "./components/registration/Signup";
import ProductDescription from "./components/ProductDescription";
import CategoryProducts from "./components/CategoryProducts";
import CheckoutPage from "./components/Checkout";
import Profile from "./components/Profile";
import useResetScrollPosition from "./hooks/useResetScrollPosition";
import GotoTop from "./components/GoToTop";
import OrderSuccessPage from "./components/OrderSuccess";
import { CartProvider } from "./context/CartContext";
import MyOrders from "./components/MyOrders";

const App = () => {
  useResetScrollPosition();
  const { apiToken, setApiToken, updatedUser } = useAuthContext();
  const logged = localStorage.getItem("loggedIn") === "true";

  const [loading, setLoading] = useState(true);

  const loco = useLocation();

  useEffect(() => {
    console.clear();
  }, [loco]);

  useEffect(() => {
    if (!apiToken) {
      fetchAccessToken();
    } else {
      setLoading(false);
    }
  }, [apiToken, setApiToken, updatedUser]);

  const fetchAccessToken = async () => {
    try {
      const response = await axiosInstance.get("/auth/refresh/");
      const newAccessToken = response.data.accessToken;
      if (newAccessToken) {
        setApiToken(newAccessToken);
        updatedUser(response.data.user);
      }
    } catch (error) {
      localStorage.setItem("loggedIn", "");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <CartProvider>
        {/* <BrowserRouter> */}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/auth/login"
              element={
                logged || apiToken ? <Navigate to="/" replace /> : <Login />
              }
            />
            <Route
              path="/auth/signup"
              element={
                logged || apiToken ? <Navigate to="/" replace /> : <Signup />
              }
            />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route
              path="/product/category/:id"
              element={<CategoryProducts />}
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/MyOrders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="*" element={<>Not a page</>} />
          </Route>
        </Routes>
        <GotoTop />
        {/* </BrowserRouter> */}
      </CartProvider>
    </Provider>
  );
};

export default App;
