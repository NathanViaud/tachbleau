<script lang="ts" setup="">
import type { SimpleUpdateUser, UpdateUser, UserWithoutPassword } from '~/types/user.type';
import { toTypedSchema } from '@vee-validate/zod';
import { simpleUserUpdate, userNoPasswordSchema, userSchema } from '~/schema';
import { useForm } from 'vee-validate';

const props = defineProps<{
    user?: UserWithoutPassword | SimpleUpdateUser
    profile?: boolean
}>();

const formSchema = !props.user ? toTypedSchema(userSchema) : props.profile ? toTypedSchema(simpleUserUpdate) : toTypedSchema(userNoPasswordSchema)

const router = useRouter();
const usersStore = useUsers();

const form = useForm({
    validationSchema: formSchema,
});

onMounted(() => {
    if (props.user) {
        if (props.profile) {
            form.setValues({
                name: props.user.name,
                job: props.user.job
            })
        } else {
            form.setValues({
                name: props.user.name,
                email: props.user.email,
                role: props.user.role,
                job: props.user.job
            })
        }
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    // const { email, name, job, role } = values;
    const { name, job } = values;

    if (!props.user) {
        // @ts-ignore
        const { password } = values;
        await usersStore.register(email, password, name, job, role);
    } else {
        if (props.profile) {
            const updatedUser: SimpleUpdateUser = {
                name,
                job
            }
            await usersStore.updateProfile(updatedUser);

        } else {
            // @ts-ignore
            const { email, role } = values
            const updatedUser: UpdateUser = {
                name,
                email,
                job,
                role
            }
            await usersStore.updateUser(props.user._id, updatedUser)
        }
    }
    await router.push('/admin/users');
});

</script>

<template>
    <form @submit="onSubmit" class="flex flex-col gap-4 w-full mx-auto max-w-2xl">
        <FormField v-if="!profile" v-slot="{ componentField }" name="email">
            <FormLabel>Email</FormLabel>
            <FormControl>
                <Input type="email" placeholder="email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
        </FormField>

        <FormField v-if="!user" v-slot="{ componentField }" name="password">
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

        <FormField v-if="!profile" v-slot="{ componentField }" name="role">
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