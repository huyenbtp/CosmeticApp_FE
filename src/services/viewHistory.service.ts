import { axiosInstance } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getAllViewHistory = async () => {
  const res = await axiosInstance.get("/api/product-view-history");
  return res.data;
};

export const useViewHistory = () => {
  return useQuery({
    queryKey: ["product-view-history"],
    queryFn: getAllViewHistory,
  });
};

const recordProductViewHistory = async (product_id: string) => {
  const res = await axiosInstance.post("/api/product-view-history", {
    product_id,
  });

  return res.data;
};

export const useRecordProductViewHistory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recordProductViewHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-view-history"],
      });
    },
  });
};
