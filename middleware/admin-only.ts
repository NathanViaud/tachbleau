import { useUsers } from '~/stores/users.store';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const user = useUser();
    
    if (!user.value) return navigateTo({ name: "auth-login" });
    else if (!(user.value.role === 'admin')) return navigateTo({ name: "index" })
});