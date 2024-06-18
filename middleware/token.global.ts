import { useUsers } from '~/stores/users.store';
import { verifyToken } from '~/services';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const token = useCookie('token');
    
    const usersStore = useUsers();
    if (token.value) {
        await usersStore.fetchCurrentUser(token.value);
    } else {
        await usersStore.logout();
    }
})