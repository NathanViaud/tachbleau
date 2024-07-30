<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useProjects } from '~/stores/projects.store';
import { useTasks } from '~/stores/tasks.store';
import { useRouter } from 'vue-router';


definePageMeta({
    middleware: 'user-only',
});

const projectsStore = useProjects();
const tasksStore = useTasks();
const user = useUser();
const router = useRouter();

const events = computed(() => {
    const newEvents = [];
    if (projectsStore.projects) {
        for (const project of projectsStore.projects) {
            newEvents.push({
                title: project.title,
                start: project.startDate,
                end: project.endDate,
                color: nameToColor(project.title),
                borderColor: "white",
                url: '/tasks/' + project._id,
            });
        }
    }

    if (tasksStore.tasks && user.value) {
        for (const task of tasksStore.tasks) {
            const project = projectsStore.projects.find(project => project._id === task.project)
            if (task.assignedTo === user.value._id) {
                newEvents.push({
                    title: task.title,
                    description: task.description,
                    date: task.deadline,
                    allDay: false,
                    color: nameToColor(project.title),
                });
            }
        }
    }
    return newEvents;
});

const calendarOptions = computed(() => {
    return {
        plugins: [
            dayGridPlugin,
            interactionPlugin
        ],
        dateClick: handleDateClick,
        initialView: 'dayGridMonth',
        displayEventTime: false,
        events: events.value,
    }
});

function handleDateClick() {
    router.push('/tasks/create'); // Redirige vers /tasks/create
}

</script>

<template>
    <div class="custom-calendar">
        <FullCalendar :options="calendarOptions"/>
    </div>
</template>
