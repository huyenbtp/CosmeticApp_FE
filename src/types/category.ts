export interface ICategory {
  _id: string;
  parent_id: string | null;
  name: string;
  slug: string;
}

export interface ICategorySection {
  _id: string;
  title: string;
  slug: string;
  items: ICategory[];
}

export interface ICategoryUI {
  _id: string;        // root id
  name: string;      // root name (hiển thị bên trái)
  slug: string;
  sections: ICategorySection[];
}
