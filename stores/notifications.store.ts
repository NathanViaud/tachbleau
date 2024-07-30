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
            if (!this.notifications) {
                return [];
            }
            return this.notifications.filter(notification => !notification.read);
        }
    },
    
    actions: {
        async fetchNotifications() {
            this.loading = true;
            try {
                this.notifications = await getNotifications();
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
                this.notifications = []; // Assurez-vous que notifications est un tableau vide en cas d'erreur
            } finally {
                this.loading = false;
            }
        },
        
        async readNotifications() {
            const ids = this.unreadNotifications.map((notif) => notif.assignedTo);
            await readNotifications(ids)
            this.unreadNotifications.forEach(notif => notif.read = true);
        }
    }
})