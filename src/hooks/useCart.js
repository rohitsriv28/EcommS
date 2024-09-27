import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../config/Axios";
import useAuthContext from "../context/useAuthContext";
import debounce from "lodash/debounce";

const useCartHook = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [inventoryData, setInventoryData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCartData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/cart/getAllByUserId/?userId=${user.userId || user.sub}`
      );
      setCartItems(response.data);
    } catch (err) {
      setError("Error fetching cart data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchInventoryData = useCallback(async (productIds) => {
    try {
      const responses = await Promise.all(
        productIds.map((id) => axiosInstance.get(`/inventory/getById/${id}`))
      );
      const inventory = {};
      responses.forEach((response) => {
        const data = response.data;
        inventory[data.id] = data;
      });
      setInventoryData(inventory);
    } catch (err) {
      console.error("Error fetching inventory data", err);
    }
  }, []);

  const debouncedUpdateCart = useCallback(
    debounce(async (itemId, quantity) => {
      try {
        await axiosInstance.put(`/cart/update/${itemId}`, { quantity });
        await fetchCartData();
      } catch (err) {
        console.error("Error updating item quantity:", err);
      }
    }, 500),
    [fetchCartData]
  );

  const removeItem = useCallback(
    async (itemId) => {
      try {
        await axiosInstance.delete(`/cart/remove/${itemId}`);
        await fetchCartData();
      } catch (err) {
        console.error("Error removing item from cart:", err);
      }
    },
    [fetchCartData]
  );

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const productIds = cartItems.map((item) => item.productId);
      fetchInventoryData(productIds);
    }
  }, [cartItems, fetchInventoryData]);

  return {
    cartItems,
    inventoryData,
    isLoading,
    error,
    debouncedUpdateCart,
    removeItem,
  };
};

export default useCartHook;
