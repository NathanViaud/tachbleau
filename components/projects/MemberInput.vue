<script setup lang="ts">
import { UserPlus } from 'lucide-vue-next';
import type { UserWithoutPassword } from '~/types/user.type';

const props = defineProps<{
    label: string;
    options: UserWithoutPassword[];
    selected: string[];
}>();

const emit = defineEmits<{
    (e: 'addUser', userId: string): void;
    (e: 'removeUser', userId: string): void;
}>();

function handleChange(option: UserWithoutPassword) {
    const wasSelected = props.selected.includes(option._id)

    if (!wasSelected) emit('addUser', option._id);
    else emit('removeUser', option._id);
}

const search = ref('');

const filteredOptions = computed(() => {
    return props.options.filter((option) => option.name.toLowerCase().includes(search.value.toLowerCase())).slice(0, 10);
});

</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button @click.stop variant="outline" size="icon" class="border-dashed">
                <UserPlus class="size-4" />
                {{ label }}
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-[200px] p-0 flex flex-col gap-2" align="start">
            <input v-model="search" class="p-2 w-full bg-transparent border-0 outline-0 placeholder-muted-foreground" type="text" placeholder="Search..." />
            <Separator orientation="horizontal" />
            <div class="p-2">
                <p class="text-sm font-semibold">Users</p>
                <div v-for="option of filteredOptions" class="flex items-center gap-2">
                    <Checkbox
                        :id="option._id"
                        :default-checked="selected.includes(option._id)"
                        :disabled="option.role === 'admin'"
                        @update:checked="handleChange(option)"
                    />
                    <label class="text-sm select-none cursor-pointer" :for="option._id">{{ option.name }}</label>
                </div>
                <p v-if="filteredOptions.length === 0" class="text-sm italic text-muted-foreground">No users found</p>
            </div>
        </PopoverContent>
    </Popover>
</template>
