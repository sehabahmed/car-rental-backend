export interface TUser  {
    name: string;
    email: string;
    role?: 'user' | 'admin';
    password: string;
    phone: number;
    address: string;
}

export interface TUpdateUser {
    password?: string;
    user: Partial<TUser>;
}