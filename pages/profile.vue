<script lang="ts" setup>
definePageMeta({
    middleware: 'user-only'
})

const user = useUser();

onMounted(() => {
    if (!user.value) return navigateTo('/auth/login');
})
</script>

<template>
    <UserForm v-if="user" :user="user" :profile="true"/>
</template>