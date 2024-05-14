<script setup lang="ts">
import { SquareKanban, UsersRound, LogOut, Bell } from "lucide-vue-next"
</script>

<template>
    <header class="border-b-2 border-b-gray-200 pt-2 pb-3 px-3 align-center bg w-full fixed z-10 top-0 backdrop-blur-lg bg-white/50">
        <div class="flex flex-row gap-5">
            <router-link to="/dashboard" class="flex flex-row gap-2">
                <img class="h-16 rounded-xl" src="" alt="">
                <div class="text-2xl font-bold flex flex-col justify-center">
                    <p>Tach'Bleau</p>
                </div>
            </router-link>
            <div class="flex flex-1 justify-end flex-row items-center gap-6 ">
                <router-link to="/kanban">
                    <Button variant="ghost" size="icon" class="w-16 h-16 rounded-full">
                        <SquareKanban />
                    </Button>
                </router-link>
                <router-link to="/stafflist">
                    <Button variant="ghost" size="icon" class="w-16 h-16 rounded-full">
                        <UsersRound />
                    </Button>
                </router-link>
                <Button variant="ghost" size="icon" class="w-16 h-16 rounded-full">
                        <PopoverNotifs />
                    </Button>
                <router-link to="/logout">
                    <Button variant="ghost" size="icon" class="w-16 h-16 rounded-full">
                        <LogOut />
                    </Button>
                </router-link>
            </div>
        </div>
    </header>
</template>