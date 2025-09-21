interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Product {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  quantity: number;
  ratingsAverage: number;
  brand: Brand;
  category: Category;
  subcategory: Subcategory[];
}

interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

interface Data {
  _id: string;
  cartOwner: string;
  createdAt: string;
  updatedAt: string;
  products: CartProduct[];
  totalCartPrice: number;
  __v: number;
}

export interface CartData {
  cartId: string;
  data: Data;
  numOfCartItems: number;
  status: string;
  message: string;
  success: boolean;
}