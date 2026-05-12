import { axiosInstance } from "./axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getOrders = async ({
  pageParam = 1,
  status,
}: {
  pageParam: number;
  status?: string;
}) => {

  const res = await axiosInstance.get("/api/orders/user", {
    params: {
      page: pageParam,
      limit: 20,
      status,
    },
  });

  return res.data;
};

export const useOrders = (status?: string) => {
  return useInfiniteQuery({
    queryKey: ["orders", status],

    queryFn: ({ pageParam }) =>
      getOrders({
        pageParam,
        status,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};

const getOrderDetail = async (id: string) => {
  const res = await axiosInstance.get(`/api/orders/${id}`);
  return res.data;
};

export const useOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};

const getOrderStatusHistory = async (id: string) => {
  const res = await axiosInstance.get(`/api/order-status-history/${id}`);
  return res.data;
};

export const useOrderStatusHistory = (id: string) => {
  return useQuery({
    queryKey: ["order-status", id],
    queryFn: () => getOrderStatusHistory(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};