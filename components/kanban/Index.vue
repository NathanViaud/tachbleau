<script setup lang="ts">
import type { Task } from '~/types';

const props = defineProps<{
    tasks: Task[];
}>();

const todo = props.tasks.filter((task) => task.status === 'todo');
const doing = props.tasks.filter((task) => task.status === 'doing');
const done = props.tasks.filter((task) => task.status === 'done');
const backlog = props.tasks.filter((task) => task.status === 'backlog');

const columns = [
    { name: 'Backlog', tasks: backlog },
    { name: 'Todo', tasks: todo },
    { name: 'Doing', tasks: doing },
    { name: 'Done', tasks: done },
];

</script>

<template>
    <div class="flex gap-8 w-full px-8">
        <KanbanColumn v-for="column of columns" :name="column.name" :tasks="column.tasks" />
    </div>
</template>