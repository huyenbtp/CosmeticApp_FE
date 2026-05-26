import { IReview } from "./review";
import { ISkinType } from "./skinType";
import { ITag } from "./tag";

export interface IProduct {
  _id: string;
  name: string;
  selling_price: number;
  image: string;
  avg_rating: number;
  brand?: string;
}

export interface IProductDetail {
  _id: string;
  sku: string;
  name: string;
  category: { _id: string; name: string }
  brand: { _id: string; name: string }
  skinTypes: ISkinType[];
  tags: ITag[];
  selling_price: number;
  description: string;
  image: string;
  available_stock: number;
  totalSold: number;
  status: string;
  avg_rating: number;
  review_count: number;
  reviews: IReview[];
  isOnWishlist: boolean;
}