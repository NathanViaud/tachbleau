import { User } from '~/server/models/user.model';

export default defineEventHandler(async (event) => {
    try {
        const users = await User.find();
        
        return { users };
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve users'
        })
    }
})