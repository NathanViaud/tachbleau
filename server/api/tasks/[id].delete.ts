import { Task } from '@/server/models/task.model';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    
    try {
        const task = await Task.findByIdAndDelete(id);
        
        return { task }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete task.'
        })
    }
});