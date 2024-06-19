import { verifyToken } from '~/server/utils/session';
import type { JwtPayload } from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const adminRoutes = [
        { url: '/api/users/:id', method: 'DELETE' },
        { url: '/api/users/:id', method: 'PUT' },
        { url: '/api/users', method: 'POST' },
    ]
    const userRoutes = [
        // Projects
        { url: '/api/projects/:id', method: 'DELETE' },
        { url: '/api/projects/:id', method: 'GET' },
        { url: '/api/projects/:id', method: 'PUT' },
        { url: '/api/projects', method: 'POST' },
        { url: '/api/projects', method: 'GET' },
        
        // Tasks
        { url: '/api/tasks/:id', method: 'DELETE' },
        { url: '/api/tasks/:id', method: 'GET' },
        { url: '/api/tasks/:id', method: 'PUT' },
        { url: '/api/tasks', method: 'POST' },
        { url: '/api/tasks', method: 'GET' },
        
        // Users
        { url: '/api/users', method: 'GET' },
        { url: '/api/users/:id', method: 'GET' },
        { url: '/api/users/logout', method: 'POST' },
        { url: '/api/users/update', method: 'PUT' },
        
        // Notifications
        { url: '/api/notifications', method: 'GET' },
        { url: '/api/notifications/setRead', method: 'POST' }
    ];
    
    const guestRoutes = [
        { url: '/api/users/login', method: 'POST' },
        { url: '/api/users/token', method: 'POST' },
        { url: '/api/users/token/verify', method: 'POST' },
    ]
    
    if (event.path.startsWith('/api')) {
        const isGuestRoute = guestRoutes.find(route => event.path.startsWith(route.url) && event.method === route.method);
        if (isGuestRoute) return;
        
        const token = getCookie(event, 'token');
        if (!token) return { status: 401, body: 'Unauthorized user no token' };
        const verifiedToken = await verifyToken(token) as JwtPayload;
        if (!verifiedToken) return { status: 401, body: 'Unauthorized user no user' };
        
        const isUserRoute = userRoutes.find(route => event.path.startsWith(route.url) && event.method === route.method);
        if (isUserRoute) return;
        
        const isAdminRoute = adminRoutes.find(route => event.path.startsWith(route.url) && event.method === route.method);
        if (isAdminRoute) {
            if (verifiedToken.role === 'admin') return;
            return { status: 403, body: 'Unauthorized user not admin' };
        }
        
        else return { status: 404, body: 'This route is not registered' }
    }
})
