<script setup lang="ts">
import type { Task } from '~/types';

defineProps<{
    columns: {
        tasks: Task[],
        status: Task['status'];
        name: string;
    }[]
}>();

const emits = defineEmits<{
    (e: 'added', data: { id: string, status: Task['status']}): void;
}>();

</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-8 w-full">
            <KanbanColumn
                v-for="column of columns"
                :name="column.name"
                :tasks="column.tasks"
                @added="emits('added', { id: $event, status: column.status })"
            />
        </div>
    </div>
</template>