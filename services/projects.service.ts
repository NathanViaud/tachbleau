import type { Project, ProjectForm } from '~/types';
import axios from 'axios';
const API_URL = '/api/projects';

export async function getProjects(): Promise<Project[]> {
    const res = await axios.get(API_URL);
    
    return res.data.projects;
}

export async function getProject(id: string): Promise<Project> {
    const res = await axios.get(`${API_URL}/${id}`);
    
    return res.data.project;
}

export async function createProject(project: ProjectForm): Promise<Project> {
    const res = await axios.post(`${API_URL}/create`, project);
    
    return res.data.project;
}

export async function updateProject(project: ProjectForm, id: string): Promise<Project> {
    const res = await axios.put(`${API_URL}/${id}`, project);
    
    return res.data.project;
}