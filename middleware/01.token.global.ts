import { useUser } from '~/composables/auth';

export default defineNuxtRouteMiddleware(async (_to, from) => {
    const user = useUser();
    
    if (!user.value) {
        const data = await useRequestFetch()('/api/users/token/verify')
        if (data) {
            user.value = data;
        }
    }
})