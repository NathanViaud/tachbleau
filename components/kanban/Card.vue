<script setup lang="ts">
import type { Task } from '~/types';
import { Card, CardHeader, CardContent, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';

defineProps<{
    task: Task;
}>();

const priorityColor = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
};

const isPlural = (value: number) => value > 1 ? 'hours' : 'hour';

</script>

<template>
   <Card>
       <CardHeader class="p-4">
           <CardTitle class="flex justify-between gap-2 items-center">
               {{ task.title }}
               <Badge :class="priorityColor[task.priority]">{{ task.priority }}</Badge>
           </CardTitle>
           <CardDescription class="flex w-full justify-between">
               <p>{{ formatDate(task.deadline) }}</p>
               <p>{{ task.duration }} {{ isPlural(task.duration) }}</p>
           </CardDescription>
       </CardHeader>
       <CardContent class="p-4 pt-0">
              <p>{{ task.description }}</p>
       </CardContent>
   </Card>
</template>