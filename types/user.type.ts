export type User = {
    email: string;
    password: string;
    name: string;
    role: string;
    job: string;
    id: string;
};

export interface UserInput {
    email :string
    password:string
}

export interface UserWithoutPassword {
    email :string
    name:string
    role:string
    job:string
}