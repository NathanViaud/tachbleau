<script setup lang="ts">
import { STATUS_OBJ, type Task } from '~/types';
import draggable from 'vuedraggable';
import { ScrollArea } from '~/components/ui/scroll-area'

const tasksStore = useTasks();

defineProps<{
    name: 'Todo' | 'Doing' | 'Done' | 'Backlog';
    status: Task['status'];
    tasks: Task[];
    filterProjectId?: string;
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
    <div class="flex flex-col gap-4 w-1/4 bg-muted/40 h-full p-3 rounded">
        <div class="flex gap-2 items-center">
            <component :is="STATUS_OBJ.find((item) => item.value === status)?.icon" class="h-4 w-4" />
            <h2>{{ name }}</h2>
        </div>

        <draggable
            class="flex flex-grow flex-col gap-3 mt-4 overflow-y-auto"
            :list="tasks"
            item-key="_id"
            v-bind="dragOptions"
            @change="handleChange"
        >
            <template #item="{ element }">
                <div class="item">
                    <KanbanCard :task="element" v-if="tasksStore.passesFilters(element, filterProjectId)" />
                </div>
            </template>
        </draggable>
    </div>
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