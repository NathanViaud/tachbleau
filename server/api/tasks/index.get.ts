import { Task } from '@/server/models/task.model';

export default defineEventHandler(async (event) => {
    try {
        const tasks = await Task.find();
        
        return {
            tasks
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve tasks.'
        })
    }
})