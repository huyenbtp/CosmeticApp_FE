import { axiosInstance } from "./axios";
import { useQuery } from "@tanstack/react-query";

// ===== API =====
const getAllCategories = async () => {
  const res = await axiosInstance.get("/api/categories");
  return res.data;
};

// ===== HOOK =====
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};