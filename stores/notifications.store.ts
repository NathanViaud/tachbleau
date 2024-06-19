import { defineStore } from 'pinia';
import type { Notification } from '@/types';
import { getNotifications, readNotifications } from '~/services/notifications.service';

interface NotificationsState {
    notifications: Notification[];
    loading: boolean;
}

export const useNotifications = defineStore('notifications', {
    state: (): NotificationsState => ({
        notifications: [],
        loading: false
    }),
    
    getters: {
        unreadNotifications(): Notification[] {
            return this.notifications.filter(notification => !notification.read);
        }
    },
    
    actions: {
        async fetchNotifications() {
            this.loading = true;
            this.notifications = await getNotifications();
            this.loading = false
        },
        
        async readNotifications() {
            const ids = this.unreadNotifications.map((notif) => notif.assignedTo);
            await readNotifications(ids)
            this.unreadNotifications.forEach(notif => notif.read = true);
        }
    }
})