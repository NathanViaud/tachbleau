import axios from 'axios';
import type { UserWithoutPassword } from '~/types/user.type';

export async function getUsers() {
    const response = await axios.get('/api/users');
    
    return response.data.users;
}

export async function login(email: string, password: string) {
    const response = await axios.post('/api/users/login', {
        email,
        password
    });
    
    return response.data.user;
}

export async function register(email: string, password: string, name: string, job: string, role: string) {
    const response = await axios.post('/api/users', {
        email,
        password,
        name,
        job,
        role
    });
    
    return response.data.user;
}

export async function postToken(user: UserWithoutPassword) {
    const response = await axios.post('/api/users/token', {
        ...user
    });
    
    return response.data.token;
}

export async function verifyToken(token: string) {
    const response = await axios.post('http://localhost:3000/api/users/token/verify', {
        token
    });

    return response.data.user
}