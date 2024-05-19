<script setup lang="ts">
import type { Task } from '~/types';
import { Separator } from '~/components/ui/separator';
import draggable from 'vuedraggable';

defineProps<{
    name: 'Todo' | 'Doing' | 'Done' | 'Backlog';
    tasks: Task[];
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
    <div class="flex flex-col gap-2 w-1/4">
        <h2 class="text-center">{{ name }}</h2>

        <Separator class="h-1 rounded" />

        <draggable
            class="flex flex-col gap-3 h-full"
            :list="tasks"
            item-key="_id"
            v-bind="dragOptions"
            @change="handleChange"
        >
            <template #item="{ element }">
                <div class="item">
                    <KanbanCard :task="element" />
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