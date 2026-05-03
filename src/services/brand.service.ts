import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

// ===== API =====
const getAllBrands = async () => {
  const res = await axiosInstance.get("/api/brands");
  return res.data;
};

// ===== HOOK =====
export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
};