import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async () => {
    const usersStore = useUsers();
    
    if (!usersStore.currentUser) {
        return navigateTo({ name: 'auth-login' })
    }
})