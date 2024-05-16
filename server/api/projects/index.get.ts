import { Project } from '@/server/models/project.model';

export default defineEventHandler(async (event) => {
    try {
        const projects = await Project.find();
        
        return {
            projects
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve projects.'
        })
    }
})