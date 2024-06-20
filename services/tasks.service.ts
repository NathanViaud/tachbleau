import type { Task, TaskForm } from '~/types'
import axios from 'axios';
const API_URL = '/api/tasks';

/**
 * Get all tasks
 * @returns {Task[]}
 * @returns {null} - If axios returns an error
 */
export async function getTasks(): Promise<Task[] | null> {
    try {
        const res = await axios.get(API_URL);
        
        return res.data.tasks;
    } catch {
        return null;
    }
}

/**
 * Get a task by id
 * @param id
 * @returns {Task}
 * @returns {null} - If axios returns an error
 */
export async function getTask(id: string): Promise<Task | null> {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        
        return res.data.task;
    } catch {
        return null
    }
}

/**
 * Create a task
 * @param task
 * @returns {Task} - The newly created task
 * @returns {null} - If axios returns an error
 */
export async function createTask(task: TaskForm): Promise<Task | null> {
    try {
        const res = await axios.post(`${API_URL}/create`, task);
        
        return res.data.task;
    } catch {
        return null;
    }
}

/**
 * Update a task
 * @param task
 * @param id
 * @returns {Task} - The updated task
 * @returns {null} - If axios returns an error
 */
export async function updateTask(task: TaskForm, id: string): Promise<Task | null> {
    try {
        const res = await axios.put(`${API_URL}/${id}`, task);
        
        return res.data.task;
    } catch {
        return null;
    }
}

/**
 * Delete a task
 * @param id
 * @returns {Task} - The deleted task
 * @returns {null} - If axios returns an error
 */
export async function deleteTask(id: string): Promise<Task | null> {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        
        return res.data.task
    } catch {
        return null;
    }
}