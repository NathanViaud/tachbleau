<script lang="ts" setup>
import { useProjects } from '~/stores/projects.store';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const projectsStore = useProjects();

onMounted(() => {
    if (!id || !projectsStore.getProjectById(id as string)) router.push('/projects')
})

</script>

<template>
    <ProjectsForm :project="projectsStore.getProjectById(id as string)" />
</template>