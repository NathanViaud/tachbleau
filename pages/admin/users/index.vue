<script setup lang="ts">
import { Trash2, Pencil, Plus } from 'lucide-vue-next';
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
    <div class="flex flex-col gap-5">
    <h1 class="text-center">Users</h1>
        <Button as-child class="w-fit self-end">
            <RouterLink to="/admin/users/create">
                <Plus class="mr-2 h-4 w-4" />
                New user
            </RouterLink>
        </Button>

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
    </div>
</template>

