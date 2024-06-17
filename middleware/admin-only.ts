import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const usersStore = useUsers();
    
    if (usersStore.currentUser && usersStore.currentUser.role !== 'admin') {
        return navigateTo({ name: "dashboard" })
    }
});