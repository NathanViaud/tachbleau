<script setup lang="ts">
import type { Task } from '~/types';
import draggable from 'vuedraggable';
import { Circle, CircleCheck, CircleDashed, Timer } from 'lucide-vue-next';
import { ScrollArea } from '~/components/ui/scroll-area'

defineProps<{
    name: 'Todo' | 'Doing' | 'Done' | 'Backlog';
    status: Task['status'];
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

function getStatusIcon(status: string) {
    if(status === 'backlog') {
        return CircleDashed;
    } else if(status === 'todo') {
        return Circle;
    } else if(status === 'doing') {
        return Timer;
    } else {
        return CircleCheck;
    }
}

</script>

<template>
    <ScrollArea class="flex flex-col gap-4 w-1/4 bg-muted/40 h-full p-2 rounded">
        <div class="flex gap-2 items-center">
            <component :is="getStatusIcon(status)" class="h-4 w-4" />
            <h2>{{ name }}</h2>
        </div>

        <draggable
            class="flex flex-col gap-3 h-full mt-4"
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
    </ScrollArea>
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