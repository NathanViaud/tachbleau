import type { Notification } from '~/types';
import axios from 'axios';

/**
 * @describe - GET all the notifications of the current user
 */
export async function getNotifications(): Promise<Notification[]> {
    const res = await axios.get('/api/notifications');
    
    return res.data.notifications;
}

/**
 * @describe - POST all the ids of the read notifications
 * @param ids
 */
export async function readNotifications(ids: string[]) {
    const res = await axios.post('/api/notifications/setRead', {
        data: ids
    });
    
    return res.data.success;
}
