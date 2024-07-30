import { Task } from '@/server/models/task.model';
import type { JwtPayload } from 'jsonwebtoken';
import { User } from '~/server/models/user.model';
import { verifyToken } from '~/server/utils/session';
import { Project } from '@/server/models/project.model';

export default defineEventHandler(async (event) => {    try {
    const projects = await Project.find();
    const token = getCookie(event, 'token');
    const tasks = await Task.find();
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
            tasks
        }
    }
    const fullUser = await User.findById(user.id);
    return {
        tasks: tasks.filter(task => fullUser?.projects?.includes(task.project))
    }
} catch {
    throw createError({
        statusCode: 500,
        statusMessage: 'Failed to retrieve projects.'
    })
}
})