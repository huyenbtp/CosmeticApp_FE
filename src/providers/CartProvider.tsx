import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { IOrderItem } from "../types/orderItem";
import { ICartItem } from "../types/cartItem";

interface CartContextType {
  cart: ICartItem[];
  totalItems: number;

  selectedItems: IOrderItem[]
  setSelectedItems: (items: IOrderItem[]) => void

  setCartFromServer: (items: ICartItem[]) => void;

  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<IOrderItem[]>([]);

  // 🔥 sync từ API
  const setCartFromServer = useCallback((items: ICartItem[]) => {
    setCart(items);
  }, []);

  // 🔹 local update (UI nhanh hơn)
  const increaseQty = useCallback((product_id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }, []);

  const decreaseQty = useCallback((product_id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((product_id: string) => {
    setCart((prev) =>
      prev.filter((item) => item.product_id !== product_id)
    );
  }, []);

  // 🔥 badge count
  const totalItems = useMemo(() => {
    return cart.length;
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      totalItems,
      selectedItems,
      setSelectedItems,
      setCartFromServer,
      increaseQty,
      decreaseQty,
      removeItem,
    }),
    [cart, totalItems, selectedItems, setSelectedItems, setCartFromServer, increaseQty, decreaseQty, removeItem]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext not found");
  return ctx;
};