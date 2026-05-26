import { axiosInstance } from "./axios";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

type OrderItemPayload = {
  product_id: string;
  unit_price: number;
  quantity: number;
};
type CreateOrderPayload = {
  items: OrderItemPayload[];
  cartItemIds: string[];
  shipping_fee: number;
  payment_method: string;
  notes?: string;
  receiver_name: string;
  phone: string;
  address_line?: string;
  ward: string;
  district: string;
  city: string;
};

const createOrder = async (data: CreateOrderPayload) => {
  const res = await axiosInstance.post("api/orders", data);

  return res.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart-count"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders", "pending"],
      });
    },
  });
};

const cancelOrder = async (data: {
  order_id: string;
  reason?: string;
}) => {
  const { order_id, ...payload } = data;
  const res = await axiosInstance.post(`api/orders/${order_id}/cancel`, payload);
  return res.data;
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", ""],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", "cancelled"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders", data._id],
      });
    },
  });
};