<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useProjects } from '~/stores/projects.store';
import { useUsers } from '~/stores/users.store';
import { useTasks } from '~/stores/tasks.store';

const usersStore = useUsers();
const projectsStore = useProjects();
const tasksStore = useTasks();

let events: any[] = []

if (projectsStore.projects) {
    for (const project of projectsStore.projects) {
        events.push({
            title: project.title,
            start: project.startDate,
            end: project.endDate,
            color : nameToColor(project.title),
            borderColor : "white",
            url: '/tasks/' + project._id,
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
                color : nameToColor(task.title),
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
    <div class="custom-calendar">
        <FullCalendar :options="calendarOptions"/>    
    </div>
</template>