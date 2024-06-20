import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const token = useCookie('token');
    
    const usersStore = useUsers();
    if (token.value && !usersStore.currentUser) {
        await usersStore.fetchCurrentUser(token.value);
    } else if (usersStore.currentUser && !token.value) {
        await usersStore.logout();
        usersStore.error = 'expired';
    }
})