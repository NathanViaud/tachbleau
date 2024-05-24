<script lang="ts" setup="">
import type { Task } from '~/types';
import { Button } from '~/components/ui/button';
import { Plus } from 'lucide-vue-next';

const tasksStore = useTasks();
const projectsStore = useProjects();

tasksStore.fetchTasks();
projectsStore.fetchProjects();

defineProps<{
    filterProjectId?: string;
}>();

const columns = computed(() => [
    {
        name: 'Backlog',
        status: 'backlog',
        tasks: tasksStore.backlog,
    },
    {
        name: 'Todo',
        status: 'todo',
        tasks: tasksStore.todo,
    },
    {
        name: 'Doing',
        status: 'doing',
        tasks: tasksStore.doing,
    },
    {
        name: 'Done',
        status: 'done',
        tasks: tasksStore.done,
    },
]);

function handleAdded(data: { id: string, status: Task['status'] }) {
    tasksStore.updateTaskStatus(data.id, data.status);
}

</script>

<template>
    <div class="flex flex-col gap-4 h-full">
        <div class="flex gap-4 justify-between">
            <TaskFilter :remove-project-filter="filterProjectId" />
            <Button as-child size="sm" class="w-fit self-end">
                <RouterLink to="/tasks/create">
                    <Plus class="w-4 h-4 mr-2"/>
                    New task
                </RouterLink>
            </Button>
        </div>
        <Kanban :columns="columns" @added="handleAdded" :filter-project-id="filterProjectId" />
    </div>
</template>