import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import debounce from "lodash/debounce";
import useAuthContext from "./useAuthContext";
import {
  deleteCart,
  fetchCart,
  patchCart,
  removeCartItem,
} from "../api/cart.api";
import { fetchInventory } from "../api/inventoty.api";
import { ShowToast } from "../components/CustomToast";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, { productId: action.payload }],
      };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    case "SET_INVENTORY_DATA":
      return {
        ...state,
        inventoryData: { ...state.inventoryData, ...action.payload },
        inventoryArray: [
          ...state.inventoryArray,
          ...Object.values(action.payload),
        ],
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
    inventoryData: {},
    inventoryArray: [],
    loading: true,
    error: null,
  });

  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthContext();
  const uid = user?.userId || user?.sub;

  const fetchCartData = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const response = await fetchCart(uid);
        dispatch({ type: "SET_CART_ITEMS", payload: response.data });
        setCartCount(response.data.length);
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Failed to fetch cart data",
      });
    } finally {
      setLoading(false);
    }
  }, [uid, user]);

  const fetchInventoryData = useCallback(
    async (productId) => {
      if (state.inventoryData[productId]) return;

      try {
        const response = await fetchInventory(productId);
        dispatch({
          type: "SET_INVENTORY_DATA",
          payload: { [productId]: response.data },
        });
      } catch (err) {
        console.error(
          `Error fetching inventory data for product ${productId}`,
          err
        );
      }
    },
    [state.inventoryData]
  );

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  useEffect(() => {
    state.cartItems.forEach((item) => {
      fetchInventoryData(item.productId);
    });
  }, [state.cartItems, fetchInventoryData]);

  const debouncedUpdateQuantity = useCallback(
    debounce(async (itemId, dataToSend) => {
      try {
        await patchCart(itemId, dataToSend);
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Failed to update item quantity",
        });
        fetchCartData();
      }
    }, 500),
    [fetchCartData]
  );

  const updateItemQuantity = useCallback(
    (itemId, quantity, productId) => {
      const item = state.cartItems.find((item) => item.id === itemId);
      const inventoryItem = state.inventoryData[item?.productId];

      if (inventoryItem && quantity <= parseFloat(inventoryItem.quantity)) {
        const dataToSend = { products: [{ productId, quantity }] };
        dispatch({
          type: "UPDATE_ITEM_QUANTITY",
          payload: { itemId, quantity },
        });
        debouncedUpdateQuantity(itemId, dataToSend);
      } else {
        console.log("Cannot update: Requested quantity exceeds inventory");
      }
    },
    [state.cartItems, state.inventoryData, debouncedUpdateQuantity]
  );

  const removeItem = useCallback(async (itemId) => {
    try {
      const res = await removeCartItem(itemId);
      if (res.status >= 200 && res.status < 300) {
        setCartCount((prev) => prev - 1);
        dispatch({ type: "REMOVE_ITEM", payload: itemId });
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message || "Failed to remove item",
      });
    }
  }, []);

const cartTotal = useMemo(
  () => (selectedProducts) => {
    return state.cartItems
      .filter((item) => selectedProducts.includes(item.id))
      .reduce((total, item) => {
        const inventoryItem = state.inventoryData[item?.productId];
        const availableQuantity = inventoryItem
          ? Math.min(
              parseFloat(item?.quantity),
              parseFloat(inventoryItem?.quantity)
            )
          : parseFloat(item?.quantity);
        return (
          total +
          (parseFloat(item?.product?.offerPrice) * availableQuantity || 0)
        );
      }, 0);
  },
  [state.cartItems, state.inventoryData]
);


  const updateLocalCartItems = useCallback((productId, remove = false) => {
    dispatch({
      type: remove ? "REMOVE_ITEM" : "ADD_ITEM",
      payload: productId,
    });
  }, []);

  const emptyCart = useCallback(
    async (selectedProducts) => {
      try {
        const ids = selectedProducts.map((item) => item.id);
        const res = await deleteCart(ids);

        if (res.status >= 200 && res.status < 300) {
          setCartCount((prev) => prev - selectedProducts.length);
          dispatch({ type: "SET_CART_ITEMS", payload: [] });
          ShowToast("success", "Cart Cleared");
        }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "Failed to clear cart",
        });
      }
    },
    [state.cartItems]
  );

  const value = {
    ...state,
    updateItemQuantity,
    removeItem,
    cartTotal,
    cartCount,
    setCartCount,
    fetchCartData,
    loading,
    updateLocalCartItems,
    emptyCart,
    inventoryArray: state.inventoryArray,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
