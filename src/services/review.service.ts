import { axiosInstance } from "./axios";
import { IReview, IWriteReview } from "../types/review";
import { useMutation, useQuery } from "@tanstack/react-query";

// ===== Gửi đánh giá =====
const createReviews = async (data: {
  reviews: IWriteReview[];
  anonymous: boolean;
}) => {
  const res = await axiosInstance.post("/api/product-reviews", data);
  return res.data;
};

export const useCreateReviews = () => {
  return useMutation({
    mutationFn: createReviews,
  });
};

// ===== Lấy review theo sản phẩm =====
const getReviewsByProduct = async (productId: string): Promise<IReview[]> => {
  const res = await axiosInstance.get(`/api/product-reviews/product/${productId}`);
  return res.data;
};

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => getReviewsByProduct(productId),
    enabled: !!productId,
  });
};
