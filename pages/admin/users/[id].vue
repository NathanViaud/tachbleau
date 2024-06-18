<script lang="ts" setup>
import { useUsers } from '~/stores/users.store';

definePageMeta({
    middleware: 'admin-only'
})

const usersStore = useUsers();
const route = useRoute();

const id = route.params.id as string;

const user = usersStore.getUser(id)

</script>

<template>
    <UserForm :user="user" />
</template>
