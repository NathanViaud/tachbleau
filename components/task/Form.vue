<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { taskSchema } from '~/schema';
import type { Task, TaskForm } from '~/types';
import { dateToCalendar, calendarToDate } from '~/utils';
import { useTasks } from '~/stores/tasks.store';

const tasksStore = useTasks();

const formSchema = toTypedSchema(taskSchema);

const router = useRouter();

const props = defineProps<{
    task?: Task
    insideSheet?: boolean
}>();

const form = useForm({
    validationSchema: formSchema,
});

onMounted(() => {
    if(props.task) {
        form.setValues({
            title: props.task.title,
            description: props.task.description,
            duration: props.task.duration,
            priority: props.task.priority,
            deadline: dateToCalendar(props.task.deadline)
        });
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    const newTask: TaskForm = {
        title: values.title,
        status: 'backlog',
        description: values.description,
        duration: values.duration,
        priority: values.priority,
        deadline: calendarToDate(values.deadline)
    }

    if(props.task) {
        await tasksStore.updateTask(newTask, props.task._id);
    } else {
        await tasksStore.addTask(newTask);

        await router.push('/kanban');
    }
});

defineExpose({
    onSubmit
})

</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4 w-full mx-auto max-w-2xl">
        <FormField v-slot="{ componentField }" name="title">
            <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Title" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description">
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Description" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="duration">
            <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Duration" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="priority">
            <FormItem>
                <FormLabel>Priority</FormLabel>
                <FormControl>
                    <Select v-bind="componentField">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Priority</SelectLabel>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="deadline">
            <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                    <DatePicker v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <Button v-if="!insideSheet">
            Submit
        </Button>
    </form>
</template>