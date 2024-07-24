<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useProjects } from '~/stores/projects.store';
import { useUsers } from '~/stores/users.store';
import { useTasks } from '~/stores/tasks.store';

// Récupérer le current user 
const usersStore = useUsers();
const projectsStore = useProjects();
const tasksStore = useTasks();

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

let events: any[] = []

if (projectsStore.projects) {
    for (const project of projectsStore.projects) {
        events.push({
            title: project.title,
            start: project.startDate,
            end: project.endDate,
            eventColor : 'purple',
        })
    }
}
if (tasksStore.tasks && usersStore.currentUser) {
    for (const task of tasksStore.tasks) {
        if (task.assignedTo == usersStore.currentUser._id) {
            events.push({
                title: task.title,
                description : task.description,
                date: task.deadline,
                allDay: false,
            })
        }
    }
}
console.log(events);

const calendarOptions = {
    plugins: [
        dayGridPlugin,
        interactionPlugin
    ],
    initialView: 'dayGridMonth',
    // dateClick: handleDateClick,
    eventColor: 'pink',
    displayEventTime: false,
    events: events,
    // eventDidMount: function(info) {
    //   var tooltip = new Tooltip(info.el, {
    //     title: info.event.extendedProps.description,
    //     placement: 'top',
    //     trigger: 'hover',
    //     container: 'body'
    //   });
    // },
};

// function handleDateClick(arg) {
//     alert('date click! ' + arg.dateStr)
// }


definePageMeta({
    middleware: 'user-only',
});

</script>
<template>
    <FullCalendar :options="calendarOptions"/>
</template>