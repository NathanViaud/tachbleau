<script setup lang="ts">
import { useTasks } from '~/stores/tasks.store';

const tasksStore = useTasks();

</script>

<template>
    <div class="flex gap-8 w-full px-8">
        <KanbanColumn name="Backlog" :tasks="tasksStore.backlog" />
        <KanbanColumn name="Todo" :tasks="tasksStore.todo" />
        <KanbanColumn name="Doing" :tasks="tasksStore.doing" />
        <KanbanColumn name="Done" :tasks="tasksStore.done" />
    </div>
</template>