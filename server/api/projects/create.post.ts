import { Project } from '@/server/models/project.model';
import { projectSchema } from '~/schema';

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, body => projectSchema.safeParse(body));
    
    if(!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const project = new Project(body.data);
        await project.save();
        
        return {
            project
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create project.'
        })
    }
})
