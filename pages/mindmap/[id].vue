<script setup lang="ts">
definePageMeta({
    middleware: 'user-only'
})

const route = useRoute()
</script>

<template>
    <MindmapFlow :room-id="route.params.id" />
</template>