export default defineEventHandler((event) => {
    deleteCookie(event, 'token')
    
    return {
        user: null
    }
})