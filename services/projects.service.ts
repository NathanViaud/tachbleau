import type { Project, ProjectForm } from '~/types';
import axios from 'axios';
const API_URL = '/api/projects';

/**
 * Get all projects
 * @returns {Project[]}
 * @returns {null} - If axios returns an error
 */
export async function getProjects(): Promise<Project[] | null> {
    try {
        const res = await axios.get(API_URL);
        
        return res.data.projects;
    } catch {
        return null;
    }
}

/**
 * Get a project by id
 * @param id
 * @returns {Project}
 * @returns {null} - If axios returns an error
 */
export async function getProject(id: string): Promise<Project | null> {
    try {
        const res = await axios.get(`${API_URL}/${id}`);
        
        return res.data.project;
    } catch {
        return null;
    }
}

/**
 * Create a project
 * @param project
 * @returns {Project} - The newly created project
 * @returns {null} - If axios returns an error
 */
export async function createProject(project: ProjectForm): Promise<Project | null> {
    try {
        const res = await axios.post(`${API_URL}/create`, project);
        
        return res.data.project;
    } catch {
        return null;
    }
}

/**
 * Update a project
 * @param project
 * @param id
 * @returns {Project} - The updated project
 * @returns {null} - If axios returns an error
 */
export async function updateProject(project: ProjectForm, id: string): Promise<Project | null> {
    try {
        const res = await axios.put(`${API_URL}/${id}`, project);
        
        return res.data.project;
    } catch {
        return null;
    }
}

/**
 * Delete a project
 * @param id
 * @return {Project} - The deleted project
 * @returns {null} - If axios returns an error
 */
export async function deleteProject(id: string): Promise<Project | null> {
    try {
        const res = await axios.delete(`${API_URL}/${id}`);
        
        return res.data.project
    } catch {
        return null;
    }
}

export async function addUserToProject(id: string, userId: string): Promise<boolean> {
    try {
        await axios.post(`${API_URL}/addUser`, { id, userId });
        
        return true;
    } catch {
        return false;
    }
}

export async function removeUserFromProject(id: string, userId: string): Promise<boolean> {
    try {
        await axios.post(`${API_URL}/removeUser`, { id, userId });
        
        return true;
    } catch {
        return false;
    }
}