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

</script>

<template>
  <Popover>
    <PopoverTrigger as-child class="relative">
        <Button size="icon" class="rounded-full w-12 h-12" variant="ghost">
            <Bell />
            <div
                v-if="notificationsStore.unreadNotifications.length > 0"
                class="absolute rounded-full w-2 h-2 bg-red-500 top-[1px] right-[2px]"
            />
        </Button>
    </PopoverTrigger>
    <PopoverContent>
        <ol class="flex flex-col gap-1">
            <li>A new task has been assigned to you: <strong>School project</strong></li>
            <Separator />
            <li>A new task has been assigned to you: <strong>Support</strong></li>
        </ol>
    </PopoverContent>
  </Popover>
</template>