export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: "user" | "admin";
}

export interface AuthResponse {
    success: boolean;
    data?: {
        id: string;
        name: string;
        email: string;
        image?: string;
        role?: string;
        accessToken: string;
    };
    error?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
