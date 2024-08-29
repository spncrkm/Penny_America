
export interface CreateExpenseRequest {
    name: string;
    description: string;
    amount: number;
    recurring: string;
    starts_on: string;
    ends_on: string;
}

export interface CreateExpenseResponse {
    user: {
        id: number;
        username: string;
    };
    id: number;
    name: string;
    description: string;
    amount: number;
    recurring: string;
    created_at: string;
    updated_at: string;
    starts_on: string;
    ends_on: string;
}

export interface PatchExpenseRequest {
    name: string;
    description: string;
    amount: number;
    recurring: string;
    starts_on: string;
    ends_on: string;
}

export interface PatchExpenseResponse {
    user: {
        id: number;
        username: string;
    };
    id: number;
    name: string;
    description: string;
    amount: number;
    recurring: string;
    created_at: string;
    updated_at: string;
    starts_on: string;
    ends_on: string;
}