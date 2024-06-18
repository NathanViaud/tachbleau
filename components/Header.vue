<script setup lang="ts">
import { SquareKanban, UsersRound, LogOut, Sun, Moon, Folders, UserRound } from "lucide-vue-next"
import { useUsers } from '~/stores/users.store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import Notifs from '~/components/popover/notifs.vue';

const colorMode = useColorMode();

function toggleColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

const usersStore = useUsers();

</script>

<template>
    <header class="border-b-2 border-b-muted pt-2 pb-3 px-3 align-center bg w-full fixed z-10 top-0 backdrop-blur-lg">
        <div class="flex flex-row gap-5 items-center">
            <Button variant="ghost" as-child class="text-2xl font-bold p-8">
                <NuxtLink to="/">Tach'Bleau</NuxtLink>
            </Button>

            <div class="flex flex-1 justify-end flex-row items-center gap-3 ">
                    <Button v-if="usersStore.currentUser" variant="ghost" size="icon" class="size-14 rounded-full" as-child>
                        <NuxtLink to="/kanban">
                            <SquareKanban />
                        </NuxtLink>
                    </Button>
                    <Button v-if="usersStore.currentUser" variant="ghost" size="icon" class="size-14 rounded-full" as-child>
                        <NuxtLink to="/projects">
                            <Folders />
                        </NuxtLink>
                    </Button>

                    <PopoverNotifs v-if="usersStore.currentUser" />

                    <DropdownMenu v-if="usersStore.currentUser">
                        <DropdownMenuTrigger as-child>
                            <Button size="icon" variant="ghost" class="rounded-full size-14">
                                <Avatar :style="`background-color: ${nameToColor(usersStore.currentUser.name)}`">
                                    <AvatarFallback class="text-black text-lg">{{ usersStore.currentUser.name.substring(0, 2) }}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem as-child>
                                <NuxtLink to="/profile" class="flex">
                                    <UserRound class="mr-2 size-4" />
                                    <span>Profile</span>
                                </NuxtLink>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator v-if="usersStore.isAdmin" />
                            <DropdownMenuItem as-child v-if="usersStore.isAdmin">
                                <NuxtLink to="/admin/users" class="flex">
                                    <UsersRound class="size-4 mr-2" />
                                    <span>Team</span>
                                </NuxtLink>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="usersStore.logout" as-child>
                                <NuxtLink to="/auth/login" class="flex">
                                    <LogOut class="size-4 mr-2" />
                                    <span>Log out</span>
                                </NuxtLink>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    <Button @click="toggleColorMode" variant="ghost" size="icon" class="h-12 w-12 rounded-full">
                        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
            </div>

        </div>
    </header>
</template>