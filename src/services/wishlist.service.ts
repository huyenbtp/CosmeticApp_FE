import { axiosInstance } from "./axios";
import { useMutation, useQuery, } from "@tanstack/react-query";

const getAllWishlistItems = async () => {
  const res = await axiosInstance.get("/api/wishlist-items");
  return res.data;
};

export const useWishlistItems = () => {
  return useQuery({
    queryKey: ["wishlist-items"],
    queryFn: getAllWishlistItems,
  });
};

const addToWishlist = async (product_id: string) => {
  const res = await axiosInstance.post("/api/wishlist-items", {
    product_id,
  });

  return res.data;
};

export const useAddToWishlist = () => {
  return useMutation({
    mutationFn: addToWishlist,
  });
};

const removeFromWishlist = async (product_id: string) => {
  const res = await axiosInstance.delete(`api/wishlist-items/${product_id}`);

  return res.data;
};

export const useRemoveFromWishlist = () => {
  return useMutation({
    mutationFn: removeFromWishlist,
  });
};
