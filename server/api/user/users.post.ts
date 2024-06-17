import { userSchema } from '~/schema';
import { User } from '~/server/models/user.model';

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, body => userSchema.safeParse(body));
    if (!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        });
    }
    try {
        const user = new User(body.data);
        await user.save();
        return { user };
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create user.'
        });
    }
});