// WishlistData.ts

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // just the id reference
}

export interface WishlistItem {
  _id: string;
  id: string; // same as _id (backend duplication sometimes)
  title: string;
  description: string;
  slug: string;

  imageCover: string;
  images: string[];

  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  sold?: number | null;

  ratingsAverage: number;
  ratingsQuantity: number;

  brand: Brand;
  category: Category;
  subcategory: Subcategory[];

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface WishlistData {
  data: WishlistItem[];
  count:number;
  success: string;
}
