import { Task } from '~/server/models/task.model';
import { taskSchema } from '~/schema';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readValidatedBody(event, body => taskSchema.safeParse(body));
    
    if(!body.success) {
        console.log('Invalid body', body.error);
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const task = await Task.findByIdAndUpdate(id, body.data, { new: true });
        
        
        return { task }
    } catch(e) {
        console.log('Failed to update task.', e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update task.'
        })
    }
})