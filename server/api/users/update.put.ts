import { simpleUserUpdate } from '~/schema';
import { User } from '~/server/models/user.model';
import { verifyToken } from '~/server/utils/session';
import type { JwtPayload } from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token');
    const body = await readValidatedBody(event, body => simpleUserUpdate.safeParse(body));
    
    if (!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    if (!token) {
        throw createError({ statusCode: 401 })
    }
    
    const verifiedToken = await verifyToken(token) as JwtPayload;
    
    if (!verifiedToken) throw createError({ statusCode: 401 })
    
    try {
        const user = await User.findByIdAndUpdate(verifiedToken.id, body.data, { new: true });
        
        return { user }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update user.'
        })
    }
})