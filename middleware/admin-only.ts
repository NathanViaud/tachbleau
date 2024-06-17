export default defineNuxtRouteMiddleware(async (_to, from) => {
    const user = useAuthUser();
});