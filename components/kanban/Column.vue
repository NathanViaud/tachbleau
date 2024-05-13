<script setup lang="ts">
import type { Task } from '~/types';
import { Separator } from '~/components/ui/separator';

defineProps<{
    name: 'Todo' | 'Doing' | 'Done' | 'Backlog';
    tasks: Task[];
}>();
</script>

<template>
    <div class="flex flex-col gap-2 w-1/4">
        <h2 class="text-center">{{ name }}</h2>

        <Separator class="h-1 rounded" />

        <div class="flex flex-col gap-3">
            <KanbanCard v-for="task of tasks" :task="task" />
        </div>
    </div>
</template>