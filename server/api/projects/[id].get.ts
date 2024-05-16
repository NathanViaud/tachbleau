import { Project } from '@/server/models/project.model';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    
    try {
        const project = await Project.findById(id);
        
        return { project }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve project.'
        })
    }
})
