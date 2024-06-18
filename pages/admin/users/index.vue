<script setup lang="ts">
import { Trash2,Pencil } from 'lucide-vue-next';
import {
    Table,
    TableBody,
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
const router = useRouter();

</script>

<template>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="user in usersStore.users" :key="user._id">
                <TableCell>{{ user.name }}</TableCell>
                <TableCell>{{ user.job }}</TableCell>
                <TableCell>{{ user.role }}</TableCell>
                <TableCell class="flex gap-2">
                    <Button
                        @click="router.push(`/admin/users/${user._id}`)"
                        variant="secondary"
                        size="icon"
                    >
                        <Pencil />
                    </Button>
                    <Button
                        @click="usersStore.deleteUser(user._id)"
                        variant="destructive"
                        size="icon"
                    >
                        <Trash2 />
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>

