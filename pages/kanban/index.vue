<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { useTasks } from '~/stores/tasks.store';
import { Plus } from 'lucide-vue-next';
import type { Task } from '~/types';

const tasksStore = useTasks();

tasksStore.fetchTasks();

const columns = computed(() => [
    {
        name: 'Backlog',
        status: 'backlog',
        tasks: tasksStore.backlog,
    },
    {
        name: 'Todo',
        status: 'todo',
        tasks: tasksStore.todo,
    },
    {
        name: 'Doing',
        status: 'doing',
        tasks: tasksStore.doing,
    },
    {
        name: 'Done',
        status: 'done',
        tasks: tasksStore.done,
    },
]);

function handleAdded(data: { id: string, status: Task['status'] }) {
    tasksStore.updateTaskStatus(data.id, data.status);
}

</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-center">All Issues</h1>
        <div class="flex gap-4 justify-between">
            <TaskFilter />
            <Button as-child size="sm" class="w-fit self-end">
                <RouterLink to="/tasks/create">
                    <Plus class="w-4 h-4 mr-2"/>
                    New task
                </RouterLink>
            </Button>
        </div>
        <Kanban :columns="columns" @added="handleAdded" />
    </div>
</template>