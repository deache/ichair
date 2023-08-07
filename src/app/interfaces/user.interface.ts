export interface User {
    uid?: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    password?: string;
}

export interface YourAppState {
    user: User | null;
}