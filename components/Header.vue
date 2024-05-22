<script setup lang="ts">
import { SquareKanban, UsersRound, LogOut, Sun, Moon } from "lucide-vue-next"

const colorMode = useColorMode();

function toggleColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

</script>

<template>
    <header class="border-b-2 border-b-muted pt-2 pb-3 px-3 align-center bg w-full fixed z-10 top-0 backdrop-blur-lg">
        <div class="flex flex-row gap-5">
            <router-link to="/dashboard" class="flex flex-row gap-2">
                <img class="h-16 rounded-xl" src="" alt="">
                <div class="text-2xl font-bold flex flex-col justify-center">
                    <p>Tach'Bleau</p>
                </div>
            </router-link>
            <div class="flex flex-1 justify-end flex-row items-center gap-6 ">
                <router-link to="/kanban">
                    <Button variant="ghost" size="icon" class="w-12 h-12 rounded-full">
                        <SquareKanban />
                    </Button>
                </router-link>
                <router-link to="/stafflist">
                    <Button variant="ghost" size="icon" class="w-12 h-12 rounded-full">
                        <UsersRound />
                    </Button>
                </router-link>
                <PopoverNotifs />
                <router-link to="/logout">
                    <Button variant="ghost" size="icon" class="w-12 h-12 rounded-full">
                        <LogOut />
                    </Button>
                </router-link>

                <Button @click="toggleColorMode" variant="ghost" size="icon" class="h-12 w-12 rounded-full">
                    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    </header>
</template>