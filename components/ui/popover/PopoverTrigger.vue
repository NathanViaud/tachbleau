<script setup lang="ts">
import { PopoverTrigger, type PopoverTriggerProps } from 'radix-vue'

const props = defineProps<PopoverTriggerProps>();

function testingThings() {
    console.log('testing');
}

</script>

<template>
  <PopoverTrigger v-bind="props">
    <slot />
  </PopoverTrigger>
</template>
