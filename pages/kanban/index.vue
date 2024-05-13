<script setup lang="ts">
import { tasks } from '~/mock/tasks';

</script>

<template>
    <Kanban :tasks="tasks" />
</template>