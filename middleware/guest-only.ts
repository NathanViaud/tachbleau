export default defineNuxtRouteMiddleware(async (_to, _from) => {
    const user = useUser();
    
    if (user.value) {
        return navigateTo({ name: "index" })
    }
})