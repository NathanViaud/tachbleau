<script setup lang="ts">
import { PRIORITY_OBJ, STATUS_OBJ, type Project } from '~/types';
import { X } from 'lucide-vue-next';
import { useTasks } from '~/stores/tasks.store';
import { useProjects } from '~/stores/projects.store';

const tasksStore = useTasks();
const projectsStore = useProjects();

</script>

<template>
    <div class="flex gap-2 w-full">
        <Input v-model="tasksStore.filters.search" placeholder="Filter tasks..." class="h-9 rounded-md px-3 max-w-[300px] w-full" />
        <TaskFilterInput label="Status" :options="STATUS_OBJ" v-model="tasksStore.filters.status" />
        <TaskFilterInput label="Priority" :options="PRIORITY_OBJ" v-model="tasksStore.filters.priority" />
        <TaskFilterInput label="Assigned" />
        <TaskFilterInput
            label="Project"
            :options="projectsStore.projects.map((project: Project) => ({ value: project._id, label: project.title }))"
            v-model="tasksStore.filters.project"
        />
        <Button v-if="!tasksStore.isFiltersDefault" @click="tasksStore.resetFilters" variant="ghost" class="flex items-center gap-1">
            Reset
            <X class="h-5 w-5"/>
        </Button>
    </div>
</template>