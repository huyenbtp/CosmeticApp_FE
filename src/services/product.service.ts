import { axiosInstance } from "./axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const getProductFilters = async (
  params?: {
    q?: string;
    category_slug?: string;
    brand_id?: string;
  }
) => {
  const res = await axiosInstance.get(
    "/api/products/filters",
    {
      params,
    }
  );

  return res.data;
};

export const useProductFilters = (
  filters?: {
    q?: string;
    category_slug?: string;
    brand_id?: string;
  }
) => {
  return useQuery({
    queryKey: ["product-filters", filters,],

    queryFn: () => getProductFilters(filters),

    staleTime: 1000 * 60 * 5,
  });
};

type ProductFilters = {
  brand_id?: string;
  category_slug?: string;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
};
const getProducts = async ({
  pageParam = 1,
  filters,
}: {
  pageParam: number;
  filters?: ProductFilters;
}) => {

  const res = await axiosInstance.get("/api/products/infinite", {
    params: {
      page: pageParam,
      limit: 10,
      ...filters,
    },
  });

  return res.data;
};

export const useProducts = (
  filters?: ProductFilters,
  options?: {
    enabled?: boolean;
  }
) => {
  return useInfiniteQuery({
    queryKey: ["products", JSON.stringify(filters)],

    queryFn: ({ pageParam }) =>
      getProducts({
        pageParam,
        filters,
      }),

    initialPageParam: 1,

    enabled: options?.enabled,

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });
};

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