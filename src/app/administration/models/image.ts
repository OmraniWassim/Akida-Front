import { Category } from "./Category";
import { Product } from "./Product";

export interface Image {
    id?: number;
    fileName: string;
    filePath: string;
    thumbnailPath?: string;
    mimeType: string;
    fileSize: number;
    product?: Product;
    category?: Category;
  }