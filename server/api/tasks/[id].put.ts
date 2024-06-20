import { Task } from '~/server/models/task.model';
import { taskSchema } from '~/schema';
import { createNotification } from '~/server/utils/notifications';

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
        const taskBefore = await Task.findById(id);
        const task = await Task.findByIdAndUpdate(id, body.data, { new: true });
        
        if (task && taskBefore?.assignedTo !== task.assignedTo && task.assignedTo) {
            await createNotification('Task assigned', `You have been assigned to the task ${task.title}`, task.assignedTo);
        }
        
        
        return { task }
    } catch(e) {
        console.log('Failed to update task.', e);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update task.'
        })
    }
})