export type User = {
    _id?: string;
    email: string;
    password: string;
    name: string;
    role: string;
    job: string;
    id: string;
};

export interface UserInput {
    email: string
    password: string
}

export interface UserWithoutPassword {
    _id: string;
    email: string
    name: string
    role: string
    job: string
}