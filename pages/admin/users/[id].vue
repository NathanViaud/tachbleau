
<script lang="ts" setup>
const route = useRoute();
import axios from 'axios';
definePageMeta({
    middleware: 'admin-only'
})

const id = route.params.id as string;

const getUser = async () => {
    const { data } = await axios.get(`/api/users/${id}`)
    console.log(data)
}

onMounted(() => {
    getUser()
})

const email = ref('')
const password = ref('')
const name = ref('')
const job = ref('')
const role = ref('')

const putUser = async (id: string) => {
    await axios.put(`/api/users/${id}`, {
        email: email.value,
        password: password.value,
        name: name.value,
        job: job.value,
        role: role.value
    })
}

const deleteUser = async (id: string) => {
    await axios.delete(`/api/users/${id}`)
}

</script>

<template>
    <div>
        <h1>User</h1>
    </div>

    <Table>
        <TableCaption>User</TableCaption>
        <TableHead>
            <TableRow>
                <TableHeader>Email</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Job</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Actions</TableHeader>
            </TableRow>
        </TableHead>
        <Table>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>
                    <Button @click="putUser(id)">
                        <Pencil />
                    </Button>
                    <Button @click="deleteUser(id)">
                        <Trash2 />
                    </Button>
                </TableCell>
            </TableRow>
        </Table>
    </Table>
</template>
