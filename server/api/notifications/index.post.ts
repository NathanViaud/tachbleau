import { Notification } from "~/server/models/notification.model";
import { notificationSchema } from '~/schema'
export default defineEventHandler(async (event) => {
  
    const body = await readValidatedBody(event, body => notificationSchema.safeParse(body));
    
    if(!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body'
        })
    }
    
    try {
        const notification = new Notification(body.data);
        await notification.save();
        
        return {
            notification
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create notification.'
        })
    }
})
