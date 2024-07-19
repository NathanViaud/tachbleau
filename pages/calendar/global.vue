<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

definePageMeta({
    middleware: 'guest-only',
});

const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: handleDateClick,
    events: [
        { title: 'event 1', date: '2024-07-01T18:00:00+00:00' },
        { title: 'event 2', date: '2024-07-02' },
        { title: 'event 2', date: '2024-07-01' }
    ]
};

function handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
}

</script>
<template>
    <FullCalendar :options="calendarOptions"/>
</template>