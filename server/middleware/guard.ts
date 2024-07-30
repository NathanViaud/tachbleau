export default defineEventHandler(async (event) => {
    const adminRoutes = [
        { url: '/api/users/.*', method: 'DELETE' },
        { url: '/api/users/.*', method: 'PUT' },
        { url: '/api/users', method: 'POST' },
        { url: '/api/projects/addUser', method: 'POST' },
    ]
    const userRoutes = [
        // Projects
        { url: '/api/projects/.*', method: 'DELETE' },
        { url: '/api/projects/.*', method: 'GET' },
        { url: '/api/projects/.*', method: 'PUT' },
        { url: '/api/projects/create', method: 'POST' },
        { url: '/api/projects', method: 'GET' },
        
        // Tasks
        { url: '/api/tasks/.*', method: 'DELETE' },
        { url: '/api/tasks/.*', method: 'GET' },
        { url: '/api/tasks/.*', method: 'PUT' },
        { url: '/api/tasks/create', method: 'POST' },
        { url: '/api/tasks', method: 'GET' },
        
        // Users
        { url: '/api/users', method: 'GET' },
        { url: '/api/users/.*', method: 'GET' },
        { url: '/api/users/logout', method: 'GET' },
        { url: '/api/users/update', method: 'PUT' },
        
        // Notifications
        { url: '/api/notifications', method: 'GET' },
        { url: '/api/notifications/setRead', method: 'POST' }
    ];
    
    const guestRoutes = [
        { url: '/api/users/login', method: 'POST' },
        { url: '/api/users/token', method: 'POST' },
        { url: '/api/users/token/verify', method: 'GET' },
    ]
    
    if (event.path.startsWith('/api')) {
        const isGuestRoute = guestRoutes.find(route => new RegExp(`^${route.url}$`).test(event.path) && event.method === route.method);
        if (isGuestRoute) return;
        
        if (!event.context.user) throw createError({ status: 401 });
        
        const isUserRoute = userRoutes.find(route => new RegExp(`^${route.url}$`).test(event.path) && event.method === route.method);
        if (isUserRoute) return;
        
        const isAdminRoute = adminRoutes.find(route => new RegExp(`^${route.url}$`).test(event.path) && event.method === route.method);
        if (isAdminRoute) {
            if (!(event.context.user.role === 'admin')) throw createError({ status: 403 })
        }
        else {
            throw createError({ status: 404, message: 'This route is not registered' });
        }
    }
})
