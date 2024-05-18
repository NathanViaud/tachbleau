<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'

import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '~/lib/utils';
import { useVModel } from '@vueuse/core';

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const props = defineProps<{
    modelValue?: DateValue
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: DateValue): void
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal w-full',
          !modelValue && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="modelValue" initial-focus />
    </PopoverContent>
  </Popover>
</template>