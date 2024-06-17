<script setup lang="ts">
const route = useRoute();

definePageMeta({
    middleware: 'user-only'
})
</script>

<template>
    <TaskViewKanban :filter-project-id="route.params.project" />
</template>