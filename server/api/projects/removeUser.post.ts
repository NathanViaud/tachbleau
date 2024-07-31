import { Project } from '@/server/models/project.model';
import { User } from '~/server/models/user.model';

export default defineEventHandler(async (event) => {
    // Read the request body
    const body = await readBody(event);
    const { id, userId } = body;
    
    try {
        const project = await Project.findById(id);
        const user = await User.findById(userId);
        
        if (!project) throw createError({ statusCode: 404, statusMessage: 'Project not found' });
        if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' });
        
        if (!user.projects) {
            user.projects = [];
        }
        
        const projectIdString = project._id.toString();
        const index = user.projects.findIndex(project => project._id.toString() === projectIdString);
        user.projects.splice(index, 1);
        
        await user.save();
        
        return { user }
    } catch (error) {
        if (error instanceof Error) {
            throw createError({
                statusCode: 500,
                statusMessage: error.message
            })
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'An unknown error occurred'
            })
        }
    }
})
