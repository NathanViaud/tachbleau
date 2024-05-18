<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { useTasks } from '~/stores/tasks.store';

const tasksStore = useTasks();

tasksStore.fetchTasks();

</script>

<template>
    <div class="flex flex-col gap-4">
        <Button as-child class="w-fit self-end">
            <RouterLink to="/tasks/create">New task</RouterLink>
        </Button>
        <Kanban />
    </div>
</template>