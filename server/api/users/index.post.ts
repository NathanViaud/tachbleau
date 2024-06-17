import { userSchema } from '~/schema';
import { User } from '~/server/models/user.model';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, body => userSchema.safeParse(body));
    if (!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        });
    }
    try {
        const password = await bcrypt.hash(body.data.password, 10);
        const user = new User({
            email: body.data.email,
            password: password,
            name: body.data.name,
            job: body.data.job,
            role: body.data.role,
        });
        await user.save();
        return { user };
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create user.'
        });
    }
});