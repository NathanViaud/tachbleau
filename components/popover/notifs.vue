<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Bell, BellDot } from "lucide-vue-next"

</script>

<template>
  <Popover>
    <PopoverTrigger>
        <Bell />
    </PopoverTrigger>
    <PopoverContent>
        <ol>
            <li>a new task has been assigned to you: <strong>School project</strong></li>
            <li>a new task has been assigned to you: <strong>Support</strong></li>
        </ol>
    </PopoverContent>
  </Popover>
</template>