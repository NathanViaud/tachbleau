import type { Notification } from '~/types';
import axios from 'axios';

/**
 * @describe - GET all the notifications of the current user
 * @returns{Notification[]}
 * @returns{null} - if the request fails
 */
export async function getNotifications(): Promise<Notification[] | null> {
    try {
        const res = await axios.get('/api/notifications');
        
        return res.data.notifications;
    } catch {
        return null
    }
}

/**
 * @describe - POST all the ids of the read notifications
 * @param ids
 * @returns{boolean} - true if the request is successful, false otherwise
 */
export async function readNotifications(ids: string[]): Promise<boolean> {
    const res = await axios.post('/api/notifications/setRead', {
        data: ids
    });
    
    return res.data.success;
}
