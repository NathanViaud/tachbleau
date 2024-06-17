<script setup lang="ts">
import { Trash2,Pencil } from 'lucide-vue-next';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import type { User } from '~/types/user.type';

definePageMeta({
    middleware: 'admin-only'
})

let users = ref<User[]>([])
let loading = ref(false)

const fetchUsers = async () => {
    const { data } = await axios.get('/api/user/users')
    users.value = data
    loading.value = false
}
onMounted(() => {
    loading.value = true
    fetchUsers()
})

let email = ref('')
let password = ref('')
let name = ref('')
let job = ref('')
let role = ref('')
const newUser = async () => {
    await axios.post('/api/user/users', {
        email: email.value,
        password: password.value,
        name: name.value,
        job: job.value,
        role: role.value
    })
}

</script>

<template>
<Table>
    <TableCaption>Users</TableCaption>
    <TableHead>
        <TableRow>
            <TableHeader>Id</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
        </TableRow>
    </TableHead>
    <TableBody>
        <TableRow v-for="user in users" :key="user.id">
            <TableCell>{{ user.id }}</TableCell>
            <TableCell>{{ user.email }}</TableCell>
            <TableCell>{{ user.role }}</TableCell>
            <TableCell>
                <Button variant="ghost" size="icon" class="size-14 rounded-full">
                    <Pencil />
                </Button>
                <Button variant="ghost" size="icon" class="size-14 rounded-full">
                    <Trash2 />
                </Button>
            </TableCell>
        </TableRow>
    </TableBody>
</Table>

<p>
Email
</p>
<input type="text" v-model="email" />
<p>
Password
</p>
<input type="text" v-model="password" />
<p>
    name
</p>
<input type="text" v-model="name" />
<p>
    job
</p>
<input type="text" v-model="job" />
<p>
Role
</p>
<input type="text" v-model="role" />
<Button @click="newUser">Create</Button>

</template>

