import type { UserWithoutPassword } from '~/types/user.type';
import { createToken } from '~/server/utils/session';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user: UserWithoutPassword = {
        _id: body._id,
        email: body.email,
        name: body.name,
        role: body.role,
        job: body.string
    }
    
    const token = await createToken(user);
    setCookie(event, 'token', token);
    
    return { token }
})