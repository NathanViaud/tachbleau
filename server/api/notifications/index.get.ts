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
    const user = await verifyToken(token) as JwtPayload;
    try {
        const notifications = await Notification.find({ assignedTo: user.id })
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
