<script setup lang="ts">
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Form, FormControl, FormField, FormLabel } from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Loader2 } from 'lucide-vue-next';

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate';
import { Alert, AlertTitle, AlertDescription } from '~/components/ui/alert';
import { AlertCircle } from 'lucide-vue-next';
import { postToken } from '~/services';
import type { UserWithoutPassword } from '~/types/user.type';

definePageMeta({
    middleware: 'guest-only'
})

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6)
}));

const form = useForm({
    validationSchema: formSchema,
});

const errorAlert = ref(false);

const onSubmit = form.handleSubmit(async (values) => {
    const { data, error } = await useFetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    });

    if (error.value) {
        errorAlert.value = true;
        return;
    } else if (data.value) {
        await postToken(data.value.user as UserWithoutPassword);
        errorAlert.value = false;
        await navigateTo('/');
    }
});

</script>

<template>
    <div>
        <!--    To prevent fragment on redirection    -->
        <p></p>
        <p></p>
        <!--    !end    -->

        <Alert class="max-w-xl mx-auto w-full mb-5" v-if="errorAlert" variant="destructive">
            <AlertCircle class="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Invalid credentials
            </AlertDescription>
        </Alert>

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

                    <Button :disabled="!form.meta.value.valid || form.isSubmitting.value" type="submit" class="mt-4">
                        <Loader2 v-if="form.isSubmitting.value" class="mr-2 size-4 animate-spin" />
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
