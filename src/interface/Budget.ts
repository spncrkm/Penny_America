export interface CreateBudgetRequest {
    category_id: number;
    subcategory_id?: number | null;
    amount: number;
    recurring: string;
}

export interface CreateBudgetResponse {
    id: number;
    category_id: number;
    subcategory_id?: number;
    amount: number;
    recurring: string;
}

export interface PatchBudgetRequest {
    category_id: number;
    subcategory_id?: number;
    amount: number;
    recurring: string;
}

export interface PatchBudgetResponse {
    user: {
        id: number;
        username: string;
    };
    id: number;
    amount: number;
    recurring: string;
    category: number;
    subcategory?: number;
}

export interface SubCategory {
    description?: string;
    id: number;
    name: string;
}

export interface Category {
    reduce: any;
    id: number;
    name: string;
    subcategories: SubCategory[];
}
  
export interface CategoryResponse {
categories: Category[];
}