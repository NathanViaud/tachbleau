import { Notification } from '~/server/models/notification.model';

export async function createNotification(title: string, message: string, userId: string) {
    const newNotification = {
        title,
        message,
        read: false,
        assignedTo: userId
    };
    
    const notification = new Notification(newNotification);
    await notification.save()
}