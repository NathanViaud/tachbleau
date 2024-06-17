<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Form, FormControl, FormField, FormLabel } from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate';
import type { UserInput } from '~/types/user.type';
import { useUsers } from '~/stores/users.store';

definePageMeta({
    middleware: 'guest-only'
})

const router = useRouter();

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6)
}));

const form = useForm({
    validationSchema: formSchema,
});

const usersStore = useUsers();

const onSubmit = form.handleSubmit(async (values) => {
    await usersStore.login(values.email, values.password);

    if (usersStore.currentUser) {
        await router.push('/');
    }
});

</script>

<template>
    <Card class="max-w-xl mx-auto w-full">
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>
        <CardContent>
            <form @submit="onSubmit" class="flex flex-col gap-2">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="Email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Password" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <Button type="submit" class="mt-4">
                    Login
                </Button>
            </form>
        </CardContent>
    </Card>
</template>
