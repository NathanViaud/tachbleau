<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Form, FormControl, FormField, FormLabel } from '~/components/ui/form';
import { Button } from '~/components/ui/button';

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate';
import { Input } from '~/components/ui/input';
import type { UserInput } from '~/types/user.type';

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

const { login } = useAuth();
const onSubmit = form.handleSubmit((values) => {
    const userData: UserInput = {
        email: values.email,
        password: values.password
    }

    login(userData).then(data => router.push('/'))
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
