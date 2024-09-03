export interface Subcategory {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    subcategories: Subcategory[];
  }
  
  export interface CategoryResponse {
    reduce(arg0: (acc: { [key: number]: string; }, category: Category) => { [key: number]: string; }, arg1: {}): unknown;
    categories: Category[];
  }