import { Task } from '~/server/models/task.model';
import { taskSchema } from '~/schema';

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, body => taskSchema.safeParse(body));
    
    if(!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const task = new Task(body.data);
        await task.save();
        
        return { task }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create task.'
        })
    }
});