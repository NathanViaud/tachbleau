import axios from 'axios';
import type { SimpleUpdateUser, UpdateUser, UserWithoutPassword } from '~/types/user.type';

/**
 * Get all users
 * @returns {UserWithoutPassword[]}
 * @returns {null} - If axios returns an error
 */
export async function getUsers(): Promise<UserWithoutPassword[] | null> {
    try {
        const response = await axios.get('/api/users');
        
        return response.data.users;
    } catch {
        return null;
    }
}

/**
 * Get a user by id
 * @param email
 * @param password
 * @returns {UserWithoutPassword}
 * @returns {null} - If axios returns an error
 */
export async function login(email: string, password: string): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.post('/api/users/login', {
            email,
            password
        });
        
        return response.data.user;
    } catch {
        return null;
    }
}

/**
 * Create a user
 * @param email
 * @param password
 * @param name
 * @param job
 * @param role
 * @returns {UserWithoutPassword} - The newly created user
 * @returns {null} - If axios returns an error
 */
export async function register(email: string, password: string, name: string, job: string, role: string): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.post('/api/users', {
            email,
            password,
            name,
            job,
            role
        });
        
        return response.data.user;
    } catch {
        return null;
    }
}

/**
 * Logout the current user
 * @returns {boolean} - True if the user was logged out successfully, false otherwise
 */
export async function logout(): Promise<boolean> {
    try {
        await axios.get('/api/users/logout');
        return true;
    } catch {
        return false;
    }
}

/**
 * Create a token for a given user
 * @param user
 * @returns {string} - The token
 * @returns {null} - If axios returns an error
 */
export async function postToken(user: UserWithoutPassword): Promise<string | null> {
    try {
        const response = await axios.post('/api/users/token', {
            ...user
        });
        
        return response.data.token;
    } catch(e) {
        return null
    }
}

/**
 * Connect the user from a token
 * @param token
 * @returns {UserWithoutPassword} - The user
 * @returns {null} - If axios returns an error
 */
export async function verifyToken(token: string): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.post('/api/users/token/verify', {
            token
        });
        
        return response.data.user
    } catch(e) {
        return null
    }
}

/**
 * Delete an user
 * @param id
 * @returns {UserWithoutPassword} - The deleted user
 * @returns {null} - If axios returns an error
 */
export async function deleteUser(id: string): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.delete(`/api/users/${id}`);
        
        return response.data.user
    } catch {
        return null;
    }
}

/**
 * Update a user
 * @param id
 * @param user
 * @returns {UserWithoutPassword} - The updated user
 * @returns {null} - If axios returns an error
 */
export async function updateUser(id: string, user: UpdateUser): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.put(`/api/users/${id}`, {
            ...user
        });
        
        return response.data.user;
    } catch {
        return null;
    }
}

/**
 * Update user profile
 * @param user
 * @returns {UserWithoutPassword} - The updatedUser
 * @returns {null} - If axios returns an error
 */
export async function simpleUpdateUser(user: SimpleUpdateUser): Promise<UserWithoutPassword | null> {
    try {
        const response = await axios.put(`/api/users/update`, {
            ...user
        });
        
        return response.data.user;
    } catch {
        return null
    }
}