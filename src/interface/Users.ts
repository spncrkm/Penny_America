export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface UserState {
    user: User;
    isLoggedIn: boolean;
    
}

export interface ErrorResponse {
    status: number;
    data: string;
}