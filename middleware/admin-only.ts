import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const usersStore = useUsers();
    
    if (!usersStore.currentUser) return navigateTo({ name: "auth-login" });
    if (!usersStore.isAdmin) return navigateTo({ name: "index" })
});