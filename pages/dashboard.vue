<script setup lang="ts">
definePageMeta({
    middleware: 'user-only'
})
</script>

<template>
    <div class="">
        <div class="mx-auto py-4">
            <h2 class="font-bold pb-3 text-xl">Current staff workload</h2>
            <ChartDashboard class="mt-3 mx-6" />
        </div>
    </div>
</template>