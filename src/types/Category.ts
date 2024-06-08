import { Subcategory } from "./Subcategory";

export interface Category {
  _id: string;
  category: string;
  subcategories: Subcategory[];
}
