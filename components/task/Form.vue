<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { Textarea } from '~/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

const formSchema = toTypedSchema(z.object({
    title: z.string().min(3).max(255),
    description: z.string().optional(),
    duration: z.number().min(1).max(1000),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.any(),
}));

const form = useForm({
    validationSchema: formSchema,
});

function formatDeadline(value: any) {
    const year = value.year;
    const month = value.month;
    const day = value.day;

    return `${year}-${month}-${day}`;
}

const onSubmit = form.handleSubmit((values) => {
    values.deadline = formatDeadline(values.deadline);
    console.log('Form submitted!', values);
});

</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4 w-full mx-auto max-w-2xl">
        <h1 class="text-center">Create a task</h1>
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
                <FormLabel>Description</FormLabel>
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

        <Button>
            Submit
        </Button>
    </form>
</template>