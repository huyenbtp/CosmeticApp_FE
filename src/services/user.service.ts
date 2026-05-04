import { axiosInstance } from "./axios";
import { useMutation } from "@tanstack/react-query";

const updateProfile = async (data: {
  full_name?: string;
  gender?: string;
  dob?: string;
  phone?: string;  
}) => {
  const res = await axiosInstance.put("/api/users/profile/customer", data);
  return res.data;
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};