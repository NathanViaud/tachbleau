import { Project } from '@/server/models/project.model';
import type { JwtPayload } from 'jsonwebtoken';
import { User } from '~/server/models/user.model';
import { verifyToken } from '~/server/utils/session';

export default defineEventHandler(async (event) => {
    try {
        const projects = await Project.find();
        const token = getCookie(event, 'token');
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        }
        const user = await verifyToken(token) as JwtPayload;
        if (!user) throw createError({ statusCode: 401 });
        if (user.role === 'admin') {
            return {
                projects
            }
        }
        const fullUser = await User.findById(user.id);
        return {
            projects: projects.filter(project => fullUser?.projects?.includes(project._id) ?? false)
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve projects.'
        })
    }
})