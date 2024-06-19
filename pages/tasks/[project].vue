<script setup lang="ts">
import { useProjects } from '~/stores/projects.store';

definePageMeta({
    middleware: 'user-only'
})

const projectsStore = useProjects();
const route = useRoute();
const router = useRouter();

const id = route.params.project;

onMounted(async () => {
   if (!id) await router.push('/projects')
})

</script>

<template>
    <div class="flex flex-col h-full gap-5" v-if="id">
        <h1 class="text-center">
            {{ projectsStore.getProjectById(id as string)?.title }}
        </h1>
        <TaskViewKanban :filter-project-id="id" />
    </div>
</template>