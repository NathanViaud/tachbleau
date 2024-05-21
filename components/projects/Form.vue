<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { projectSchema } from '~/schema';
import type { Project, ProjectForm } from '~/types';
import { dateToCalendar } from '~/utils';
import { createProject } from '~/services';
import { Button } from '~/components/ui/button';

const formSchema = toTypedSchema(projectSchema);

const router = useRouter();

const props = defineProps<{
    project?: Project
}>();

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
        tasks: [],
        startDate: calendarToDate(values.startDate),
        endDate: calendarToDate(values.endDate)
    }

    if(props.project) {
        // update project
        console.log('else');
    } else {
        console.log('new project', newProject);
        await createProject(newProject);
        await router.push('/projects');
        // create project

        // await router.push('/projects');
    }
})

function test() {
    console.log('test');
}

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