import { axiosInstance } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

const getMe = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["auth/me"],
    queryFn: getMe,
  });
};