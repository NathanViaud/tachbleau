<script setup lang="ts">
import type { Project } from '~/types';
import { Progress } from '~/components/ui/progress';
import { useTasks } from '~/stores/tasks.store';
import { useProjects } from '~/stores/projects.store';

const props = defineProps<{
    project: Project;
}>();

const projectsStore = useProjects();
const tasksStore = useTasks();
const projectAdvancement = computed(() => projectsStore.getProjectAdvancement(props.project._id));

const router = useRouter();

</script>

<template>
    <div
        @click="router.push(`/tasks/${project._id}`)"
        class="border rounded border-muted p-4 flex gap-2 items-center cursor-pointer transition project-item"
        v-if="tasksStore.tasks.length"
    >
        <div class="flex flex-col flex-1">
            <h2 class="text-lg font-semibold">{{ project.title }}</h2>
            <span class="text-muted-foreground">{{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}</span>
        </div>

        <div class="flex flex-col max-w-xl w-full gap-2">
            <Progress :model-value="projectAdvancement.percentage" class="h-2.5" />
            <div class="flex gap-2 justify-between">
                <span>{{ projectAdvancement.percentage }}%</span>
                <span>{{ projectAdvancement.done }} / {{ projectAdvancement.tasks }} tasks</span>
            </div>
        </div>
    </div>
</template>

