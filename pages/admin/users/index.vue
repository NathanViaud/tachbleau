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

</script>

<template>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead class="w-[100px] text-center">
                        Email
                    </TableHead>
                    <TableHead class="text-center">Rôle</TableHead>
<!--                    <TableHead class="text-right">Edit</TableHead>-->
                    <TableHead class="text-center">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell class="font-medium text-center">
                        Admin@test.fr
                    </TableCell>
                    <TableCell class="text-center">Admin</TableCell>
                    <TableCell class="text-center">
                        <div>
                            <Button variant="destructive" class="m-1"> <Trash2/></Button>
                            <Button><Pencil class="m-1" /></Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
</template>

