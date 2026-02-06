import { OrderStatus } from "../enum/OrderStatus.enum";
import { AppUser } from "./AppUser";
import { OrderItem } from "./OrderItem";

export interface Order {
    id?: number;  
    orderDate?: string; 
    status?: OrderStatus; 
    totalAmount: number;
    deliveryAddress: string;
    appUser: { id: number,firstName?: string, lastName?: string }; 
    items: OrderItem[];
}