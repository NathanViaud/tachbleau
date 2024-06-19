<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Bell } from "lucide-vue-next"
import { Separator } from '@/components/ui/separator'
import { useNotifications } from '~/stores/notifications.store';

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
        <ol class="flex flex-col gap-1">
            <template v-for="(notification, index) in notificationsStore.unreadNotifications">
                <li class="flex flex-col gap-1 text-sm">
                    <strong>{{ notification.title}}:</strong> {{ notification.message }}
                </li>
                <Separator v-if="index !== notificationsStore.unreadNotifications.length - 1" />
            </template>
        </ol>
    </PopoverContent>
  </Popover>
</template>