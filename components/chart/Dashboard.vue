<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis, VisGroupedBar } from '@unovis/vue'
import { computed } from 'vue';
//import { useUserStore } from '@/stores/user.store.ts';

//const userStore = useUserStore();

const maximum = {
    hours: 35,
}

const user = [
    'Julien',
    'Nathan',
    'Bob',
    'Oussama',
    'Amine',
    'SophieLaGirafe'
]

type DataRecord = { x: number, y: number, y1: number, maximum: number, name: string }
const data = computed(() => [
    { x: 0, y: 28, maximum: maximum.hours },
    { x: 1, y: 31, maximum: maximum.hours },
    { x: 2, y: 24, maximum: maximum.hours },
    { x: 3, y: 7, maximum: maximum.hours },
    { x: 4, y: 39, maximum: maximum.hours },
    { x: 5, y: 12, maximum: maximum.hours },
])

const x = (d: DataRecord) => d.x
const y = [
    (d: DataRecord) => d.y,
    (d: DataRecord) => d.y1,
]

function getColor(d: DataRecord) {
    if(d.y > 35) {
        return '#ef4444'
    } else if(d.y > 35 * 0.8 ) {
        return '#fbbf24'
    } else {
        return '#10b981'
    }
}

const color = (d: DataRecord) => getColor(d)
const tickFormat = (tick: number) => user[tick]

</script>

<template>
    <div class="px-5 m-auto">
        <VisXYContainer :data="data">
            <VisStackedBar orientation="horizontal" :barPadding="0.2" :roundedCorners="true" :x="x" :y="y" :color="color" />
            <VisAxis type='x' label='Forecast hours / Maximum hours' />
            <VisAxis type='y' :tickFormat="tickFormat" />
        </VisXYContainer>
    </div>
</template>