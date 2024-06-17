import { User } from '~/server/models/user.model';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    
    try {
        const user = await User.findByIdAndDelete(id);
        
        return { user }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete user.'
        })
    }
});