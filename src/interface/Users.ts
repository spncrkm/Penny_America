export interface User {
    id?: number | string | undefined;
    username: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
}

export interface UserState {
    user: User[]
}

export interface ErrorResponse {
    status: number;
    data: string;
}