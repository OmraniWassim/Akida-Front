import { Category } from "./Category";
import { ProductAttribute } from "./ProductAttribute";

  export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    stockQuantity: number;
    isAvailable: boolean;
    category?: Category;
    attributes?: ProductAttribute[];
  }