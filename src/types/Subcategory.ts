import { Product } from "./Product";

export interface Subcategory {
  _id: string;
  name: string;
  products: Product[];
}