import type { JwtPayload } from "jsonwebtoken";
import { Notification } from "~/server/models/notification.model";
import { verifyToken } from '~/server/utils/session';

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token');
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
    const verify = await verifyToken(token) as JwtPayload;

    const user = verify;
    try {
        const notifications = await Notification.find({ assignedTo: user.id }).populate('assignedTo');
        console.log(notifications);
        return {
            notifications
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve notifications.'
        })
    }

})
