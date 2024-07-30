export type User = {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: string;
    job: string;
    id: string;
    projects?: string[];
};

export interface UserInput {
    email: string;
    password: string;
}

export interface UserWithoutPassword {
    _id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    job: string;
    projects?: string[];
}

export type UpdateUser = Omit<UserWithoutPassword, '_id'>
export type SimpleUpdateUser = Omit<UpdateUser, 'role' | 'email'>