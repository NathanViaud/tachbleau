<script setup lang="ts">
import type { Project } from '~/types';

defineProps<{
    projects: Project[];
}>();

</script>

<template>
    <div class="flex flex-col gap-2">
        <ProjectsItem v-for="project in projects" :key="project._id" :project="project" />
    </div>
</template>