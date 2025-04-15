import { Product } from "./Product";
import { Image } from "./image";

export interface Category{
    id:number,
    name:string,
    description: string,
    products?:Product[],
    image?:Image
    parent?:Category,
    children?:Category[],
  }
