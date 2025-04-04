<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { projectSchema } from '~/schema';
import type { Project, ProjectForm } from '~/types';
import { dateToCalendar, calendarToDate } from '~/utils';
import { Button } from '~/components/ui/button';

const props = defineProps<{
    project?: Project
}>();

const projectsStore = useProjects();
const router = useRouter();

const formSchema = toTypedSchema(projectSchema);

const form = useForm({
    validationSchema: formSchema
});

onMounted(() => {
    if(props.project) {
        form.setValues({
            title: props.project.title,
            description: props.project.description,
            startDate: dateToCalendar(props.project.startDate),
            endDate: dateToCalendar(props.project.endDate)
        })
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    const newProject: ProjectForm = {
        title: values.title,
        description: values.description,
        startDate: calendarToDate(values.startDate),
        endDate: calendarToDate(values.endDate)
    }

    if(props.project) {
        await projectsStore.updateProject(newProject, props.project._id);
        await router.push('/projects')
    } else {
        await projectsStore.createProject(newProject);
        await router.push('/projects');
    }
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

        <FormField v-slot="{ componentField }" name="startDate">
            <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                    <DatePicker v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="endDate">
            <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                    <DatePicker v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <Button>
            Submit
        </Button>
    </form>
</template>