<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Bell } from "lucide-vue-next"
import { Separator } from '@/components/ui/separator'
import { useNotifications } from '~/stores/notifications.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { notificationSchema } from '~/schema';

const notificationsStore = useNotifications();

function change(e: any) {
    if (!e) {
        notificationsStore.readNotifications();
    }
}

</script>

<template>
  <Popover @update:open="change">
    <PopoverTrigger as-child>
        <Button size="icon" class="rounded-full w-12 h-12" variant="ghost">
            <div class="relative">
                <Bell />
                <div
                    v-if="notificationsStore.unreadNotifications.length > 0"
                    class="absolute rounded-full w-2 h-2 bg-red-500 -top-[1px] right-[2px]"
                />
            </div>
        </Button>
    </PopoverTrigger>
    <PopoverContent>
        <Tabs default-value="account">
            <TabsList class="flex w-full mb-4">
                <TabsTrigger value="unread" class="flex-1">
                    Unread
                </TabsTrigger>
                <TabsTrigger value="all" class="flex-1">
                    All
                </TabsTrigger>
            </TabsList>
            <TabsContent value="unread">
                <ol class="flex flex-col gap-1" v-if="notificationsStore.unreadNotifications.length">
                    <template v-for="(notification, index) in notificationsStore.unreadNotifications">
                        <li class="flex flex-col gap-1 text-sm">
                            <strong>{{ notification.title}}:</strong> {{ notification.message }}
                        </li>
                        <Separator v-if="index !== notificationsStore.unreadNotifications.length - 1" />
                    </template>
                </ol>
                <p v-else>
                    No unread notifications
                </p>
            </TabsContent>
            <TabsContent value="all">
                <ol class="flex flex-col gap-1">
                    <template v-for="(notification, index) in notificationsStore.notifications">
                        <li class="flex flex-col gap-1 text-sm">
                            <strong>{{ notification.title}}:</strong> {{ notification.message }}
                        </li>
                        <Separator v-if="index !== notificationsStore.unreadNotifications.length - 1" />
                    </template>
                </ol>
            </TabsContent>
        </Tabs>
    </PopoverContent>
  </Popover>
</template>