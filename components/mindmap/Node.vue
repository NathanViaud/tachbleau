<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
import { GripVertical } from 'lucide-vue-next';

const props = defineProps<{
    id: string;
    label: string;
}>();

const emits = defineEmits<{
    (e: 'updateLabel', value: string): void;
}>();

const data = ref(props.label);

watch(() => props.label, (value) => {
    data.value = value;
});

</script>

<template>
    <div class="p-4">
        <Handle type="target" :position=Position.Top />

        <div class="flex gap-2 z-10 relative items-center">
            <GripVertical />
            <Input v-model="data" @input="emits('updateLabel', data)"/>
        </div>

        <Handle type="source" :position=Position.Top />
    </div>
</template>

<style scoped>
.vue-flow__handle.target {
    @apply top-1/2 pointer-events-none opacity-0;
}

.vue-flow__handle.source {
    @apply top-0 left-0 transform-none border-2 border-muted bg-background w-full h-full rounded-lg text-primary;
}
.vue-flow__node.selected .vue-flow__handle.source {
    @apply border-primary;
}
</style>