import { User } from '~/server/models/user.model';
import { userNoPasswordSchema } from '~/schema';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readValidatedBody(event, body => userNoPasswordSchema.safeParse(body));
    
    if(!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const user = await User.findByIdAndUpdate(id, body.data, { new: true });
        
        return { user }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update user.'
        })
    }
})