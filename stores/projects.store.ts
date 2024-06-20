import { defineStore } from 'pinia';
import type { Project, ProjectForm, Task } from '~/types';
import { createProject, deleteProject, getProjects, updateProject } from '~/services';

interface ProjectsState {
    projects: Project[];
    loading: boolean;
}

export const useProjects = defineStore('projects', {
    state: (): ProjectsState => ({
        projects: [],
        loading: false
    }),
    
    getters: {
        getProjectById: (state) => (id: string) => {
            return state.projects.find((project: Project) => project._id === id);
        }
    },
    
    actions: {
        async fetchProjects() {
            this.loading = true;
            const projects = await getProjects();
            if (!projects) return;
            this.projects = projects;
            this.loading = false;
        },
        
        async createProject(project: ProjectForm) {
            this.loading = true;
            const newProject = await createProject(project);
            if (!newProject) return;
            
            this.projects.push(newProject);
            this.loading = false;
        },
        
        async updateProject(project: ProjectForm, id: string) {
            this.loading = true
            const updatedProject = await updateProject(project, id);
            if (!updatedProject) return;
            
            this.projects = this.projects.map(project => project._id === updatedProject._id ? updatedProject : project);
            this.loading = false;
        },
        
        async deleteProject(id: string) {
            this.loading = true;
            const deletedProject = await deleteProject(id);
            if (!deletedProject) return;
            
            this.projects = this.projects.filter(project => project._id !== deletedProject._id);
            this.loading = false;
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
