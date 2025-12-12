export type User = {
  id: number;
  name?: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  user_id: number;
  category_id: number;
  name: string;
  description?: string;
  price?: number;
  created_at: Date;
  updated_at: Date;
};

export type ProductImage = {
  product_id: number;
  image_url: string;
  public_id: string;
  created_at: Date;
  updated_at: Date;
};

export type ProductInfo = {
  id: number;
  user_id: number;
  category_id: number;
  name: string;
  description?: string;
  price?: number;
  created_at: Date;
  updated_at: Date;
  category: Category;
  user: User;
  images: ProductImage[];
};

export type ProductForm = {
  name: string;
  description?: string;
  price?: number;
  category_id: number;
};

export type ImageData = {
  image_url: string;
  public_id: string;
};

export type ProductListProps = {
  products: ProductInfo[];
  categories: Category[];
  hasMore: boolean;
  nextCursor: number | null;
  fetchProducts: (cursor: number | null, reset?: boolean) => void;
};
