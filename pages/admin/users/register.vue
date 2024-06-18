<script lang="ts" setup="">
import { toTypedSchema } from '@vee-validate/zod';
import { userSchema } from '~/schema';
import { useForm } from 'vee-validate';

definePageMeta({
    middleware: 'admin-only'
})

const formSchema = toTypedSchema(userSchema)

const router = useRouter();
const usersStore = useUsers();

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    const { email, password, name, job, role } = values;

    await usersStore.register(email, password, name, job, role);
    await router.push('/admin/users');
});

</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4 w-full mx-auto max-w-2xl">
        <FormField v-slot="{ componentField }" name="email">
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input type="email" placeholder="email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input type="password" placeholder="password" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="name">
            <FormLabel>Name</FormLabel>
            <FormControl>
                <Input type="text" placeholder="Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="role">
            <FormLabel>Role</FormLabel>
            <FormControl>
                <Select v-bind="componentField" :default-value="null">
                    <SelectTrigger>
                        <SelectValue placholder="role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FormControl>
            <FormMessage />
        </FormField>

        <FormField v-slot="{ componentField }" name="job">
            <FormLabel>Job</FormLabel>
            <FormControl>
                <Input type="text" placeholder="Job" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormField>

        <Button>
            Submit
        </Button>
    </form>
</template>