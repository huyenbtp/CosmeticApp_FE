import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

const getAllOrders = async () => {
  const res = await axiosInstance.get("/api/orders");
  return res.data;
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
};


const getOrderDetail = async (id: string) => {
  const res = await axiosInstance.get(`/api/orders/${id}`);
  return res.data;
};

export const useOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};