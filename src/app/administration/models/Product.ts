import { Category } from "./Category";
import { Image } from "./image";
import { ProductAttribute } from "./ProductAttribute";

  export interface Product {
    id?: number;
    reference: string;
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    category?: Category;
    attributes?: ProductAttribute[];
    images: Image[];
  }