<script setup lang="ts">
import { SquareKanban, UsersRound, LogOut, Sun, Moon, Folders } from "lucide-vue-next"

const colorMode = useColorMode();

function toggleColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

</script>

<template>
    <header class="border-b-2 border-b-muted pt-2 pb-3 px-3 align-center bg w-full fixed z-10 top-0 backdrop-blur-lg">
        <div class="flex flex-row gap-5 items-center">
            <Button variant="ghost" as-child class="text-2xl font-bold p-8">
                <NuxtLink to="/dashboard">Tach'Bleau</NuxtLink>
            </Button>
            <div class="flex flex-1 justify-end flex-row items-center gap-3 ">
                <Button variant="ghost" size="icon" class="size-14 rounded-full" as-child>
                    <NuxtLink to="/kanban">
                        <SquareKanban />
                    </NuxtLink>
                </Button>
                <Button variant="ghost" size="icon" class="size-14 rounded-full" as-child>
                    <NuxtLink to="/projects">
                        <Folders />
                    </NuxtLink>
                </Button>
                <Button variant="ghost" size="icon" class="size-14 rounded-full" as-child>
                    <NuxtLink to="/stafflist">
                        <UsersRound />
                    </NuxtLink>
                </Button>

                <Button variant="ghost" size="icon" class="size-14 rounded-full">
                    <LogOut />
                </Button>

                <PopoverNotifs />

                <Button @click="toggleColorMode" variant="ghost" size="icon" class="h-12 w-12 rounded-full">
                    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    </header>
</template>