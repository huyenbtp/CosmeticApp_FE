import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

const getRecommendations = async (limit: number) => {
  const res = await axiosInstance.get(
    `/api/recommendations`,
    { params: { limit } }
  );
  return res.data;
};

export const useRecommendProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: ["recommendations", limit],
    queryFn: () => getRecommendations(limit),
  });
};


const getNewProducts = async (limit: number) => {
  const res = await axiosInstance.get(
    `/api/recommendations/new-products`,
    { params: { limit } }
  );
  return res.data;
};

export const useNewProducts = (limit: number = 10) => {
  return useQuery({
    queryKey: ["recommendations", limit],
    queryFn: () => getNewProducts(limit),
  });
};