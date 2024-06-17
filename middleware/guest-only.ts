import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const usersStore = useUsers();
    
    if (usersStore.currentUser) {
        return navigateTo({ name: "dashboard" })
    }
})