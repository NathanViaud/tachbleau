<script setup lang="ts">
import { PlusCircleIcon, CheckIcon } from 'lucide-vue-next';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '~/components/ui/command';
import { cn } from '~/lib/utils';

interface Option {
    label: string;
    value: string;
    icon?: string;
}

defineProps<{
    label: string;
    options: Option[];
}>();

const selected = ref(new Set());
// const selectedValues = computed(() => new Set())

function selectItem(option: Option) {
    const isSelected = selected.value.has(option.value);

    if (isSelected) selected.value.delete(option.value);
    else selected.value.add(option.value);

    // Filter values there
    const filterValues = Array.from(selected.value);
}

</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" size="sm" class="border-dashed">
                <PlusCircleIcon class="mr-2 h-4 w-4" />
                {{ label }}

                <template v-if="selected.size > 0">
                    <Separator orientation="vertical" class="mx-2 h-4" />

                    <Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
                        {{ selected.size }}
                    </Badge>

                    <div class="hidden space-x-1 lg:flex">
                        <Badge
                            v-if="selected.size > 2"
                            variant="secondary"
                            class="rounded-sm px-1 font-normal"
                        >
                            {{ selected.size }} selected
                        </Badge>

                        <template v-else>
                            <Badge
                                v-for="item in selected"
                                :key="item"
                                variant="secondary"
                                class="rounded-sm px-1 font-normal"
                            >
                                {{ item }}
                            </Badge>
                        </template>
                    </div>
                </template>
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-[200px] p-0" align="start">
<!--            Certainly will need to add a filter function-->
            <Command
                :filter-function="(list, term) => list.filter(item => item.label.toLowerCase().includes(term.toLowerCase()))"
            >
                <CommandInput :placeholder="label" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option"
                            @select="selectItem(option)"
                        >
                            <div
                                :class="cn(
                                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                  selected.has(option.value)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'opacity-50 [&_svg]:invisible',
                                )"
                            >
                                <CheckIcon class="h-4 w-4" />
                            </div>

                            <component :is="option.icon" v-if="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{{ option.label }}</span>
                            <!--                            facets ?-->
                        </CommandItem>
                    </CommandGroup>

                    <template v-if="selected.size > 0">
                        <CommandSeparator />
                        <CommandGroup>
                            <CommandItem
                                :value="{ label: 'Clear filters' }"
                                class="justify-center text-center"
                                @select="selected.clear()"
                            >
                                Clear filters
                            </CommandItem>
                        </CommandGroup>
                    </template>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>