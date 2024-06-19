import * as z from 'zod';
import { Notification } from '~/server/models/notification.model';

export default defineEventHandler(async (event) => {
    const validation = z.object({
        data: z.array(z.string())
    });

    const idArray = await readValidatedBody(event, body => validation.safeParse(body));
    console.log('idArray',idArray.data.data)

    if (!idArray.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        });
    }
    try {
        const res = await Notification.updateMany({ _id: { $in: idArray.data.data  } }, { read: true });
        console.log('res', res);
        return {
            success: true
        };
    }
    catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update notifications.'
        });
    }
});