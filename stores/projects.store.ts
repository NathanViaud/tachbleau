import { defineStore } from 'pinia';
import type { Project, Task } from '~/types';
import { getProjects } from '~/services';

interface ProjectsState {
    projects: Project[];
}

export const useProjects = defineStore('projects', {
    state: (): ProjectsState => ({
        projects: []
    }),
    
    actions: {
        async fetchProjects() {
            this.projects = await getProjects();
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
