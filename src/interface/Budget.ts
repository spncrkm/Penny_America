export interface CreateBudgetRequest {
    category_id: number;
    subcategory_id: number;
    amount: number;
    recurring: string;
}

export interface CreateBudgetResponse {
    id: number;
    category_id: number;
    subcategory_id: number;
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