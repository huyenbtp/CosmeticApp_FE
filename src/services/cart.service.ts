import { ICartItem } from "../types/cartItem";
import { axiosInstance } from "./axios";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";

const getAllCartItems = async () : Promise<ICartItem[]> => {
  const res = await axiosInstance.get("/api/cart-items");
  return res.data;
};

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartItems,
  });
};

const getCartCount = async () => {
  const res = await axiosInstance.get("api/cart-items/count");
  return res.data;
};

export const useCartCount = () => {
  return useQuery({
    queryKey: ["cart-count"],
    queryFn: getCartCount,
  });
};

const addToCart = async (data: {
  product_id: string;
  quantity: number;
}) => {
  const res = await axiosInstance.post("/api/cart-items", data);
  return res.data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "cart-count"] });
    },
  });
};

const updateCartItem = async (data: {
  cartItemId: string;
  quantity: number;
}) => {
  const res = await axiosInstance.put(`api/cart-items/${data.cartItemId}`, {
    quantity: data.quantity,
  });
  return res.data;
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

const deleteCartItem  = async (cartItemId: string) => {
  const res = await axiosInstance.delete(`api/cart-items/${cartItemId}`);
  return res.data;
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", "cart-count"] });
    },    
  });
};