import { defineStore } from 'pinia';
import type { Project, ProjectForm, Task } from '~/types';
import { createProject, deleteProject, getProjects, updateProject } from '~/services';

interface ProjectsState {
    projects: Project[];
}

export const useProjects = defineStore('projects', {
    state: (): ProjectsState => ({
        projects: []
    }),
    
    getters: {
        getProjectById: (state) => (id: string) => {
            return state.projects.find((project: Project) => project._id === id);
        }
    },
    
    actions: {
        async fetchProjects() {
            this.projects = await getProjects();
        },
        
        async createProject(project: ProjectForm) {
            const newProject = await createProject(project);
            
            this.projects.push(newProject);
        },
        
        async updateProject(project: ProjectForm, id: string) {
            const updatedProject = await updateProject(project, id);
            
            this.projects = this.projects.map(project => project._id === updatedProject._id ? updatedProject : project);
        },
        
        async deleteProject(id: string) {
            const deletedProject = await deleteProject(id);
            
            this.projects = this.projects.filter(project => project._id !== deletedProject._id);
        },
        
        getProjectTasks(projectId: string) {
            const tasksStore = useTasks();
            
            return tasksStore.tasks.filter((task: Task) => task.project === projectId);
        },
        
        getProjectAdvancement(projectId: string) {
            const res = {
                percentage: 0,
                tasks: 0,
                done: 0
            }
            
            const projectTasks = this.getProjectTasks(projectId);
            if(!projectTasks.length) return res;
            
            const doneTasks = projectTasks.filter((task: Task) => task.status === 'done');
            const totalTasks = projectTasks.length;
            const percentage = Math.round((doneTasks.length / totalTasks) * 100);
            
            return {
                percentage,
                tasks: totalTasks,
                done: doneTasks.length
            }
        }
    }
})
