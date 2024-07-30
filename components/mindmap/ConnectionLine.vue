<script setup lang="ts">
import { getStraightPath } from '@vue-flow/core';

const props = defineProps({
    sourceX: {
        type: Number,
        required: true,
    },
    sourceY: {
        type: Number,
        required: true,
    },
    targetX: {
        type: Number,
        required: true,
    },
    targetY: {
        type: Number,
        required: true,
    },
})

const path = computed(() =>
    getStraightPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        targetX: props.targetX,
        targetY: props.targetY,
    }),
);

</script>

<template>
    <g>
        <path :d="path[0]" class="stroke-muted stroke-2" />
        <circle :cx="targetX" :cy="targetY" :r="3" class="stroke-muted stroke-2" />
    </g>
</template>
