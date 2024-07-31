<script setup lang="ts">
import { STATUS_OBJ, type Task } from '~/types';
import draggable from 'vuedraggable';
import { ScrollArea } from '~/components/ui/scroll-area'
import { Skeleton } from '~/components/ui/skeleton';

const tasksStore = useTasks();

defineProps<{
    name: 'Todo' | 'Doing' | 'Done' | 'Backlog';
    status: Task['status'];
    tasks: Task[];
    filterProjectId?: string;
    loading: boolean;
}>();

const emits = defineEmits<{
    (e: 'added', id: string): void;
}>();

const dragOptions = {
    animation: 200,
    group: 'tasks',
    disabled: false,
    ghostClass: 'ghost',
}

function handleChange(evt: any) {
    if(evt.added) {
        emits('added', evt.added.element._id);
    }
}

</script>

<template>
    <div v-if="!loading" class="flex flex-col gap-4 w-1/4 bg-muted/40 h-auto p-3 rounded">
        <div class="flex gap-2 items-center">
            <component :is="STATUS_OBJ.find((item) => item.value === status)?.icon" class="h-4 w-4" />
            <h2>{{ name }}</h2>
        </div>

        <ScrollArea class="h-full">
            <draggable
                class="flex flex-grow flex-col mt-4 gap-3 overflow-y-auto"
                :list="tasks"
                item-key="_id"
                v-bind="dragOptions"
                @change="handleChange"
            >
                <template #item="{ element }">
                    <div class="item" v-if="tasksStore.passesFilters(element, filterProjectId)">
                        <KanbanCard :task="element" />
                    </div>
                </template>
            </draggable>
        </ScrollArea>
    </div>

    <Skeleton v-else class="w-1/4 h-full rounded"/>
</template>

<style scoped>
/* This is black magic, don't touch it */
.item {
    transition: text .2s linear;
}

.ghost {
    opacity: .5;
}
</style>