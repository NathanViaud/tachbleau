import { Task } from '@/server/models/task.model';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    
    try {
        const task = await Task.findById(id);
        
        return { task }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve task.'
        })
    }
})