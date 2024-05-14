import { defineStore } from 'pinia';
import type { Notification } from '@/types';

interface NotificationsState {
    notifications: Notification[];
}

export const useNotifications = defineStore('notifications', {
    state: (): NotificationsState => ({
        notifications: []
    }),
    
    getters: {
        unreadNotifications(): Notification[] {
            return this.notifications.filter(notification => !notification.read);
        }
    },
    
    actions: {
        addNotification(title: string, message: string) {
            this.notifications.push({
                id: Math.random().toString(36).substring(7),
                title,
                message,
                read: false
            });
        }
    }
})