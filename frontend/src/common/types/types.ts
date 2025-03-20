export interface HighlightsType {
  _id: number;
  _base: string;
  title: string;
  name: string;
  image: string;
  color: string;
  buttonTitle: string;
}

export interface CategoryProps {
  _id: number;
  image: string;
  name: string;
  _base: string;
  description: string;
}

export interface ProductProps {
  _id: number;
  _base: string;
  reviews: number;
  rating: number;
  quantity: number;
  overView: string;
  name: string;
  isStock: boolean;
  isNew: boolean;
  images: [string];
  discountedPrice: number;
  regularPrice: number;
  description: string;
  colors: [string];
  category: string;
  brand: string;
}

export interface BlogProps {
  _id: number;
  image: string;
  title: string;
  description: string;
  _base: string;
}

export interface UserTypes {
  avatar?: string;
  createAt: string;
  email: string;
  id: string;
  updatedAt?: string;
  username?: string;
  verifiedEmail: boolean;
  firstName?: string;
  lastName?: string;
}

export interface OrderTypes {
  createdAt: string;
  id: string;
  orderItems: ProductProps[];
  paymentId: string;
  paymentMethod:string;
  status:string;
  totalAmount: string;
  userId: string;
}
