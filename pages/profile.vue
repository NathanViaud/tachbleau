<script lang="ts" setup>
definePageMeta({
    middleware: 'user-only'
})

import { useUsers } from '~/stores/users.store';

const usersStore = useUsers();

const router = useRouter();

onMounted(() => {
    if (!usersStore.currentUser) router.push('/auth/login');
})
</script>

<template>
    <UserForm v-if="usersStore.currentUser" :user="usersStore.currentUser" :profile="true"/>
</template>