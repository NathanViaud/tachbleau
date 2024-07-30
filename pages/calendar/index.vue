<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useProjects } from '~/stores/projects.store';
import { useTasks } from '~/stores/tasks.store';

definePageMeta({
    middleware: 'user-only',
});

const projectsStore = useProjects();
const tasksStore = useTasks();
const user = useUser();

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
            if (task.assignedTo === user.value._id) {
                newEvents.push({
                    title: task.title,
                    description: task.description,
                    date: task.deadline,
                    allDay: false,
                    color: nameToColor(task.title),
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
        initialView: 'dayGridMonth',
        displayEventTime: false,
        events: events.value,
    }
});
</script>

<template>
    <div class="custom-calendar">
        <FullCalendar :options="calendarOptions"/>
    </div>
</template>
