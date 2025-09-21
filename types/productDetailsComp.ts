// 🔹 Brand type
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// 🔹 Category type
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// 🔹 Subcategory type
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// 🔹 Review type (unknown fields, so keeping flexible for now)
export interface Review {
  [key: string]: any;
}

// 🔹 ProductDetails type
export interface ProductDetails {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  imageCover: string;
  images: string[];
  price: number;
  quantity: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  brand: Brand;
  category: Category;
  subcategory: Subcategory[];
}
