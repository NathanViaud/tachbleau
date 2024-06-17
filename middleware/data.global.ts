import { useUsers} from '~/stores/users.store';
import { useProjects } from '~/stores/projects.store';
import { useTasks } from '~/stores/tasks.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path !== '/' && to.path !== '/auth/login') {
        console.log('fetching data');
        const usersStore = useUsers();
        const projectsStore = useProjects();
        const tasksStore = useTasks();
        
        if (!tasksStore.tasks.length) tasksStore.fetchTasks();
        if (!projectsStore.projects.length) projectsStore.fetchProjects();
        if (!usersStore.users.length) usersStore.fetchUsers();
        
        return;
    }
    
    return;
})