
<script lang="ts" setup>
const route = useRoute();
import axios from 'axios';
definePageMeta({
    middleware: 'admin-only'
})

const id = route.params.id as string;

const email = ref('')
const role = ref('')
const name = ref('')
const job = ref('')

const getUser = async () => {
    const { data } = await axios.get(`/api/users/${id}`)
    email.value = data.email
    role.value = data.role
    name.value = data.name
    job.value = data.job
}
const updateUser = async () => {
    await axios.put(`/api/users/${id}`, {
        email: email.value,
        role: role.value,
        name: name.value,
        job: job.value
    })
}

onMounted(getUser)


</script>

<template>
    <div>
        <h1>User</h1>
        <form @submit.prevent="updateUser">
            <Input type="text" v-model="email" placeholder={{ email.value }} />
            <Input type="text" v-model="role" />
            <Input type="text" v-model="name" />
            <Input type="text" v-model="job" />
            <Button type="submit">Update</Button>
        </form>
    </div>
</template>
