<script setup lang="ts">
import type { Task } from '~/types';
import { Card, CardHeader, CardContent, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

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
    <Sheet>
        <SheetTrigger as-child>
            <Card class="cursor-pointer transition card hover:shadow">
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
        </SheetTrigger>

        <SheetContent class="max-w-2xl w-full sm:max-w-2xl flex flex-col gap-3">
        <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
        </SheetHeader>
        <TaskForm class="w-full" />
    </SheetContent>
  </Sheet>
</template>

<style scoped>
.card:hover {
    transform: scale(1.025);
}
</style>