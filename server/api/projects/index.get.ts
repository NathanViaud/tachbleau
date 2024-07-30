import { Project } from '@/server/models/project.model';
import { User } from '~/server/models/user.model';

// get sur projects si non admin ne renvoie que les projets sur lequel l'utilisateurs est membre

export default defineEventHandler(async (event) => {
    try {
        const projects = await Project.find();
        const user = await User.findById(event.context.userId);
        if (!user) throw createError({ statusCode: 401 });
        if (user.role !== 'admin') return {
            projects: projects.filter(project => user.projects?.includes(project._id) ?? false)
        }
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