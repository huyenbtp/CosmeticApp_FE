export interface ICategory {
  _id: string;
  parent_id: string | null;
  name: string;
  slug: string;
}