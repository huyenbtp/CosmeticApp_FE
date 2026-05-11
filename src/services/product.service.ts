import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

const getProductDetail = async (id: string) => {
  const res = await axiosInstance.get(`/api/products/${id}/customer`);
  return res.data;
};

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};