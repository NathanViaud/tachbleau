<script setup lang="ts">
import type { Task } from '~/types';

defineProps<{
    columns: {
        tasks: Task[],
        status: Task['status'];
        name: string;
    }[],
    filterProjectId?: string;
    loading: boolean;
}>();

const emits = defineEmits<{
    (e: 'added', data: { id: string, status: Task['status']}): void;
}>();

</script>

<template>
    <div class="flex flex-col gap-4 h-full">
        <div class="flex gap-4 w-full h-full">
            <KanbanColumn
                v-for="column of columns"
                :name="column.name"
                :tasks="column.tasks"
                :status="column.status"
                :filter-project-id="filterProjectId"
                :loading="loading"
                @added="emits('added', { id: $event, status: column.status })"
            />
        </div>
    </div>
</template>