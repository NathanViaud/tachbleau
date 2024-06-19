<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import { useProjects } from '~/stores/projects.store';
import { Loader2 } from 'lucide-vue-next';

const projectsStore = useProjects();

definePageMeta({
    middleware: 'user-only'
});

</script>

<template>
    <div class="flex flex-col gap-5 h-full">
        <h1 class="text-center">Projects</h1>
        <Button as-child class="w-fit self-end">
           <RouterLink to="/projects/create">
               <Plus class="mr-2 h-4 w-4" />
               New project
           </RouterLink>
        </Button>
        <ProjectsList v-if="!projectsStore.loading" :projects="projectsStore.projects" />
        <Loader2 v-else class="animate-spin size-16 m-auto flex-1" />
    </div>
</template>