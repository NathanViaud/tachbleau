import { verifyToken } from '~/server/utils/session';
import { User } from '~/server/models/user.model';
import type { JwtPayload } from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const { token } = await readBody(event);
    
    if (!token) throw createError({ statusCode: 400 });
    const verifiedToken = await verifyToken(token) as JwtPayload
    if (!verifiedToken) throw createError({ statusCode: 401 });
    
    const user = await User.findById(verifiedToken.id);
    
    return { user }
})