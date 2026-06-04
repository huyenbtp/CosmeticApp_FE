export interface IReview {
  _id: string;
  user_full_name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IWriteReview {
  product_id: string;
  rating: number;
  comment: string;
}