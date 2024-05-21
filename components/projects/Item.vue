<script setup lang="ts">
import type { Project } from '~/types';
import { Progress } from '~/components/ui/progress';

defineProps<{
    project: Project;
}>();

const progress = ref(20);

</script>

<template>
    <div class="border rounded border-muted p-4 flex gap-2 items-center">
        <div class="flex flex-col flex-1">
            <h2 class="text-lg font-semibold">{{ project.title }}</h2>
            <span class="text-muted-foreground">{{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}</span>
        </div>

        <div class="flex flex-col max-w-xl w-full gap-2">
            <Progress v-model="progress" class="h-2.5" />
            <div class="flex gap-2 justify-between">
                <span>{{ progress }}%</span>
                <span>0/12 tasks</span>
            </div>
        </div>
    </div>
</template>