<script setup lang="ts">
import { BaseEdge, getStraightPath, type EdgeProps } from '@vue-flow/core';

const props = defineProps<EdgeProps>();

const edgePathParams = computed(() => getStraightPath(props))
</script>

<template>
    <BaseEdge :path="edgePathParams[0]" />
</template>