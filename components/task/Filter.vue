<script setup lang="ts">
const defaultFilters = {
    text: '',
    status: [],
    priority: [],
    assigned: []
}
const filters = reactive({ ...defaultFilters })
import { Circle, CircleCheck, Timer, CircleDashed, Minus, ChevronUp, ChevronsUp, X } from 'lucide-vue-next';

const isFiltersDefault = computed(() => JSON.stringify(filters) === JSON.stringify(defaultFilters));

function resetFilters() {
    Object.assign(filters, defaultFilters);
}

const status = [
    { label: 'backlog', value: 'backlog', icon: CircleDashed },
    { label: 'todo', value: 'todo', icon: Circle },
    { label: 'doing', value: 'doing', icon: Timer },
    { label: 'done', value: 'done', icon: CircleCheck }
]

const priority = [
    { label: 'low', value: 'low', icon: Minus },
    { label: 'medium', value: 'medium', icon: ChevronUp },
    { label: 'high', value: 'high', icon: ChevronsUp }
]

</script>

<template>
    <div class="flex gap-2 w-full">
        <Input v-model="filters.text" placeholder="Filter tasks..." class="h-9 rounded-md px-3 max-w-[300px] w-full" />
        <TaskFilterInput label="Status" :options="status" />
        <TaskFilterInput label="Priority" :options="priority" />
        <TaskFilterInput label="Assigned" />
        <Button v-if="!isFiltersDefault" @click="resetFilters" variant="ghost" class="flex items-center gap-1">
            Reset
            <X class="h-5 w-5"/>
        </Button>
    </div>
</template>