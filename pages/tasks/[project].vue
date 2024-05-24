<script setup lang="ts">
const route = useRoute();

</script>

<template>
    <TaskViewKanban :filter-project-id="route.params.project" />
</template>