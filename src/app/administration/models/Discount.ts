import { Product } from "./Product";

export interface Discount{
    id: number;
    percentage: number;
    startDate: Date; 
    endDate: Date; 
    products: Product[];
}