import axios from 'axios';
import type { SimpleUpdateUser, UpdateUser, UserWithoutPassword } from '~/types/user.type';

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

export async function logout() {
    await axios.get('/api/users/logout');
}

export async function postToken(user: UserWithoutPassword) {
    try {
        const response = await axios.post('/api/users/token', {
            ...user
        });
        
        return response.data.token;
    } catch(e) {
        // console.log('error', e);
        return null
    }
}

export async function verifyToken(token: string) {
    try {
        const response = await axios.post('/api/users/token/verify', {
            token
        });
        
        return response.data.user
    } catch(e) {
        // console.log('error', e);
        return null
    }
}

export async function deleteUser(id: string) {
    const response = await axios.delete(`/api/users/${id}`);
    
    return response.data.user
}

export async function updateUser(id: string, user: UpdateUser) {
    const response = await axios.put(`/api/users/${id}`, {
        ...user
    });
    
    return response.data.user;
}

export async function simpleUpdateUser(user: SimpleUpdateUser) {
    const response = await axios.put(`/api/users/update`, {
        ...user
    });
    
    return response.data.user;
}