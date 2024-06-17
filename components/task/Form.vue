<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { taskSchema } from '~/schema';
import { PRIORITY_OBJ, type Project, STATUS_OBJ, type Task, type TaskForm } from '~/types';
import { dateToCalendar, calendarToDate, nameToColor } from '~/utils';
import { useTasks } from '~/stores/tasks.store';
import { useUsers } from '~/stores/users.store';
import { CircleUserRound } from 'lucide-vue-next';

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

const projectsStore = useProjects();
const usersStore = useUsers();

onMounted(async () => {
    if(props.task) {
        form.setValues({
            title: props.task.title,
            status: props.task.status,
            description: props.task.description,
            duration: props.task.duration,
            priority: props.task.priority,
            deadline: dateToCalendar(props.task.deadline),
            project: props.task.project,
            assignedTo: props.task.assignedTo
        });
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    const newTask: TaskForm = {
        title: values.title,
        status: values.status,
        description: values.description,
        duration: values.duration,
        priority: values.priority,
        deadline: calendarToDate(values.deadline),
        project: values.project,
        assignedTo: values.assignedTo
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

        <div class="flex gap-2 items-center mt-2 flex-wrap">
            <FormField v-slot="{ componentField }" name="status">
                <FormItem>
                    <FormControl>
                        <Select v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup class="pr-1">
                                    <SelectLabel>Status</SelectLabel>
                                    <SelectItem v-for="status of STATUS_OBJ" :value="status.value">
                                        <p class="flex items-center gap-1">
                                            <component :is="status.icon" class="size-4" />
                                            {{ status.label }}
                                        </p>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="priority">
                <FormItem>
                    <FormControl>
                        <Select v-bind="componentField">
                            <SelectTrigger>
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Priority</SelectLabel>
                                    <SelectItem v-for="priority of PRIORITY_OBJ" :value="priority.value">
                                        <p class="flex items-center gap-1">
                                            <component :is="priority.icon" class="size-4" />
                                            {{ priority.label }}
                                        </p>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="deadline">
                <FormItem>
                    <FormControl>
                        <DatePicker v-bind="componentField" placeholder="Deadline" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="project">
                <FormItem>
                    <FormControl>
                        <Select v-bind="componentField" :default-value="null">
                            <SelectTrigger>
                                <SelectValue placeholder="Project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Project</SelectLabel>
                                    <SelectItem :value="null">
                                        No project
                                    </SelectItem>
                                    <SelectItem v-for="project in projectsStore.projects" :key="project._id" :value="project._id">
                                        {{ project.title }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="assignedTo">
                <FormItem>
                    <FormControl>
                        <Select v-bind="componentField" :default-value="null">
                            <SelectTrigger>
                                <SelectValue placeholder="Assignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Assignee</SelectLabel>
                                    <SelectItem :value="null">
                                        <p class="flex items-center gap-1">
                                            <CircleUserRound class="user-icon size-6 text-muted-foreground" />
                                            No assignee
                                        </p>
                                    </SelectItem>
                                    <SelectItem v-for="user in usersStore.users" :key="user._id" :value="user._id">
                                        <p class="flex items-center gap-1">
                                            <Avatar class="size-6" :style="`background-color: ${nameToColor(user.name)}`">
                                                <AvatarFallback class="text-black">{{ user.name.substring(0, 2) }}</AvatarFallback>
                                            </Avatar>
                                            {{ user.name }}
                                        </p>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            </FormField>

        </div>
        <Button v-if="!insideSheet">
            Submit
        </Button>
    </form>
</template>