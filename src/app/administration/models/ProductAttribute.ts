import { Product } from "./Product";

export interface ProductAttribute {
    id?: number;
    key: string;
    value: string;
    product?: Product;
  }