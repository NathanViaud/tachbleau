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

definePageMeta({
    middleware: 'admin-only'
})

const usersStore = useUsers();

</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="user in usersStore.users" :key="user._id">
                <TableCell>{{ user._id }}</TableCell>
                <TableCell>{{ user.name }}</TableCell>
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
</template>

