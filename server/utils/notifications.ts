import { notificationSchema } from '~/schema';

export function createNotifications(title: string, message: string, userId: string) {
    const newNotification = notificationSchema.safeParse({
        title,
        message,
        read: false,
        assignedTo: userId
    })
    const notification = new Notification(newNotification);
}