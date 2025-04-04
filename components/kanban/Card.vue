<script setup lang="ts">
import { STATUS_OBJ, type Task } from '~/types';
import { Card, CardHeader, CardContent, CardTitle } from '~/components/ui/card';
import { Calendar, ChevronUp, ChevronsUp, Minus, CircleUserRound } from 'lucide-vue-next';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetTrigger,
} from '@/components/ui/sheet'

import TaskFormComponent from '~/components/task/Form.vue';
import { nameToColor, getRelativeDate, isDateInPast } from '~/utils';
import { useTasks } from '~/stores/tasks.store';

const tasksStore = useTasks();

const props = defineProps<{
    task: Task;
}>();

const taskForm: Ref<InstanceType<typeof TaskFormComponent> | null> = ref(null);

function onSubmit() {
    if(!taskForm.value) return;

    taskForm.value.onSubmit();
}

const usersStore = useUsers();
const assignedUser = computed(() => (props.task && props.task.assignedTo) ? usersStore.getUser(props.task.assignedTo) : null);

</script>

<template>
    <Sheet>
        <SheetTrigger as-child>
            <Card class="cursor-pointer transition card">
                <CardHeader class="p-2 gap-1">
                    <CardTitle class="flex gap-2 items-center justify-between text-md font-normal">
                        <div class="flex gap-2 items-center">
                            <Transition name="fade" mode="out-in">
                                <component :is="STATUS_OBJ.find((item) => item.value === task.status)?.icon" class="h-4 w-4" />
                            </Transition>

                            {{ task.title }}
                        </div>
                        <CircleUserRound v-if="!assignedUser" class="user-icon w-7 h-7 text-muted-foreground" />
                        <Avatar v-else class="h-7 w-7" :style="`background-color: ${nameToColor(assignedUser.name)}`">
                            <AvatarFallback class="text-black">{{ assignedUser.name.substring(0, 2) }}</AvatarFallback>
                        </Avatar>
                    </CardTitle>

                    <CardDescription class="flex w-full justify-between">
                        <p class="flex items-center gap-1" :class="{ 'text-red-500' : isDateInPast(task.deadline) && task.status !== 'done' }">
                            <Calendar class="h-4 w-4" />
                            {{ getRelativeDate(task.deadline) }}
                        </p>
                    </CardDescription>
                </CardHeader>

                <CardContent class="p-2 pt-0">
                    <ChevronsUp v-if="task.priority === 'high'" class="h-4 w-4 text-red-500" />
                    <ChevronUp v-else-if="task.priority === 'medium'" class="h-4 w-4 text-orange-500" />
                    <Minus v-else class="h-4 w-4 text-blue-500" />
                </CardContent>
            </Card>
        </SheetTrigger>

        <SheetContent class="max-w-xl w-full sm:max-w-xl flex flex-col gap-3">
            <SheetHeader>
                <SheetTitle>Edit Task</SheetTitle>
            </SheetHeader>

            <TaskForm ref="taskForm" :task="task" :inside-sheet="true" class="w-full" />
            <SheetClose as-child>
                <Button @click="onSubmit" type="submit">Edit</Button>
                <Button variant="destructive" @click="tasksStore.deleteTask(task._id)">Delete</Button>
            </SheetClose>
        </SheetContent>
    </Sheet>
</template>

<style scoped>
.user-icon {
    stroke-width: 1.3;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>