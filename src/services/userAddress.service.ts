import { IUserAddress } from "../types/userAddress";
import { axiosInstance } from "./axios";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";

const getAllUserAddress = async (): Promise<IUserAddress[]> => {
  const res = await axiosInstance.get("/api/user-addresses");
  return res.data;
};

export const useUserAddresses = () => {
  return useQuery({
    queryKey: ["user-addresses"],
    queryFn: getAllUserAddress,
  });
};

const getDefaultUserAddress = async (): Promise<IUserAddress> => {
  const res = await axiosInstance.get("/api/user-addresses/default");
  return res.data;
};

export const useDefaultUserAddresses = () => {
  return useQuery({
    queryKey: ["default-user-address"],
    queryFn: getDefaultUserAddress,
  });
};

const createAddress = async (data: {
  receiver_name: string;
  phone: string;
  address_line: string;
  ward_code: number;
  district_code: number;
  city_code: number;
  ward: string;
  district: string;
  city: string;
  is_default: boolean;
}) => {
  const res = await axiosInstance.post("/api/user-addresses", data);
  return res.data;
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-user-address"] });
    },
  });
};

const updateUserAddress = async (data: {
  _id: string;
  receiver_name: string;
  phone: string;
  address_line: string;
  ward_code: number;
  district_code: number;
  city_code: number;
  ward: string;
  district: string;
  city: string;
  is_default: boolean;
}) => {
  const { _id, ...payload } = data;

  const res = await axiosInstance.put(`api/user-addresses/${data._id}`, payload);
  return res.data;
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-user-address"] });
    },
  });
};

const deleteUserAddress = async (userAddressId: string) => {
  const res = await axiosInstance.delete(`api/user-addresses/${userAddressId}`);
  return res.data;
};

export const useDeleteUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["default-user-address"] });
    },
  });
};