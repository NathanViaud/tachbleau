import type { Task, TaskForm } from '~/types'
import axios from 'axios';
const API_URL = '/api/tasks';

export async function getTasks(): Promise<Task[]> {
    const res = await axios.get(API_URL);
    
    return res.data.tasks;
}

export async function getTask(id: string): Promise<Task> {
    const res = await axios.get(`${API_URL}/${id}`);
    
    return res.data.task;
}

export async function createTask(task: TaskForm): Promise<Task> {
    const res = await axios.post(`${API_URL}/create`, task);
    
    return res.data.task;
}

export async function updateTask(task: TaskForm, id: string): Promise<Task> {
    console.log('task', task);
    const res = await axios.put(`${API_URL}/${id}`, task);
    console.log('res', res);
    
    return res.data.task;
}