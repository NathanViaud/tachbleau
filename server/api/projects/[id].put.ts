import { Project } from '@/server/models/project.model';
import { projectSchema } from '~/schema';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readValidatedBody(event, body => projectSchema.safeParse(body));
    
    if(!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const project = await Project.findByIdAndUpdate(id, body.data, { new: true });
        
        return {
            project
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update project.'
        })
    }
});