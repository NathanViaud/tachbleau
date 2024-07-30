<script setup lang="ts">
import type { Project } from '~/types';
import { Progress } from '~/components/ui/progress';
import { useTasks } from '~/stores/tasks.store';
import { useProjects } from '~/stores/projects.store';
import { PenLine, Trash2, Waypoints } from 'lucide-vue-next';

const props = defineProps<{
    project: Project;
}>();

const projectsStore = useProjects();
const tasksStore = useTasks();
const usersStore = useUsers();
const projectAdvancement = computed(() => projectsStore.getProjectAdvancement(props.project._id));

const router = useRouter();

function getUsers(projectId: string) {
    return usersStore.users.filter(user => user?.projects?.includes(projectId) || user.role === 'admin');
}

const projectUsers = computed(() => usersStore.users.filter(user => user?.projects?.includes(props.project._id) || user.role === 'admin').map((user) => user._id));

</script>

<template>
    <div
        @click="router.push(`/tasks/${project._id}`)"
        class="flex flex-col gap-2 border rounded border-muted p-4 cursor-pointer transition-all project-item group"
        v-if="tasksStore.tasks.length"
    >
        <div class="flex gap-5 items-center">
            <div class="flex flex-col flex-1">
                <h2 class="text-lg font-semibold group-hover:underline transition-all">{{ project.title }}</h2>
                <span class="text-muted-foreground">{{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}</span>
            </div>

            <div class="flex flex-col max-w-xl w-full gap-2">
                <Progress :model-value="projectAdvancement.percentage" class="h-2.5" />
                <div class="flex gap-2 justify-between">
                    <span>{{ projectAdvancement.percentage }}%</span>
                    <span>{{ projectAdvancement.done }} / {{ projectAdvancement.tasks }} tasks</span>
                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button size="icon" variant="outline" @click.stop>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="size-5">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56">
                    <DropdownMenuLabel>Options</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem as-child>
                        <NuxtLink :to="`/projects/${project._id}`">
                            <PenLine class="size-4 mr-2" />
                            <span>Edit</span>
                        </NuxtLink>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem @click="projectsStore.deleteProject(project._id)">
                        <Trash2 class="size-4 mr-2" />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Button size="icon" as-child variant="outline" @click.stop>
                <NuxtLink :to="`/mindmap/${project._id}`">
                    <Waypoints class="size-5" />
                </NuxtLink>
            </Button>
        </div>

        <div class="flex items-center gap-3">

            <ProjectsMemberInput
                :options="usersStore.users"
                :selected="projectUsers"
                @add-user="usersStore.addToProject($event, project._id)"
                @remove-user="usersStore.removeFromProject($event, project._id)"
            />

            <div class="flex items-center">
                <Avatar
                    v-for="(user, index) in getUsers(project._id)"
                    size="xs"
                    :key="user._id"
                    :style="`background-color: ${nameToColor(user.name)}`"
                    class="relative -ml-2 z-10"
                    :class="{ 'ml-0': index === 0 }"
                >
                    <AvatarFallback class="text-black">{{ user.name.substring(0, 2) }}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    </div>
</template>

