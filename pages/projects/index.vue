<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { useProjects } from '~/stores/projects.store';

const projectsStore = useProjects();

definePageMeta({
    middleware: 'user-only'
});

</script>

<template>
    <div class="flex flex-col gap-5">
        <h1 class="text-center">Projects</h1>
        <Button as-child class="w-fit self-end">
           <RouterLink to="/projects/create">
               <Plus class="mr-2 h-4 w-4" />
               New project
           </RouterLink>
        </Button>
        <ProjectsList :projects="projectsStore.projects" />
    </div>
</template>