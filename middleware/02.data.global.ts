import { useUsers} from '~/stores/users.store';
import { useProjects } from '~/stores/projects.store';
import { useTasks } from '~/stores/tasks.store';
import { useNotifications } from '~/stores/notifications.store';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path !== '/auth/login') {
        const user = useUser();
        if (!user.value) return;
        
        const usersStore = useUsers();
        const projectsStore = useProjects();
        const tasksStore = useTasks();
        const notificationsStore = useNotifications();
        
        if (!tasksStore.tasks || !tasksStore.tasks.length) tasksStore.fetchTasks();
        if (!projectsStore.projects || !projectsStore.projects.length) projectsStore.fetchProjects();
        if (!usersStore.users || !usersStore.users.length) usersStore.fetchUsers();
        if (!notificationsStore.notifications || !notificationsStore.notifications.length) notificationsStore.fetchNotifications();
        
        return;
    }
    
    return;
})