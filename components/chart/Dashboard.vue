<script setup lang="ts">
import { VisXYContainer, VisStackedBar, VisAxis } from '@unovis/vue';
import { computed } from 'vue';
import { useTasks } from '@/stores/tasks.store';
import { useUsers } from '@/stores/users.store';

type DataRecord = { x: number, y: number, maximum: number, name: string };

const tasksStore = useTasks();
const userStore = useUsers();

const maximum = {
    hours: 35,
}

const tasks = computed(() => [...tasksStore.todo, ...tasksStore.doing]);

const data = computed(() => {
  const res: DataRecord[] = [];
  const assignedTos = new Set();

  // Calculer la somme des durées pour chaque utilisateur
  tasks.value.forEach((task) => {
    if (task.assignedTo) {
      assignedTos.add(task.assignedTo);
      const item = res.find((item) => Array.from(assignedTos).indexOf(task.assignedTo) + 1 === item.x);
      if (item) {
        item.y += task.duration;
      } else {
        res.push({
          x: Array.from(assignedTos).indexOf(task.assignedTo) + 1,
          y: task.duration,
          maximum: maximum.hours,
          name: getUserName(task.assignedTo),
        });
      }
    }
  });

  return res;
});

const x = (d: DataRecord) => d.x;
const y = [(d: DataRecord) => d.y];

function getColor(d: DataRecord) {
  if (d.y > 35) {
    return '#ef4444';
  } else if (d.y > 35 * 0.8) {
    return '#fbbf24';
  } else {
    return '#10b981';
  }
}

const color = (d: DataRecord) => getColor(d);

function getUserName(userId: string) {
  const user = userStore.users.find((user) => user._id === userId);
  return user ? user.name : 'Unknown';
}

const assignedToNames = computed(() => {
  const assignedToNames = {};
  data.value.forEach((item) => {
    assignedToNames[item.x] = item.name;
  });
  return assignedToNames;
});

const tickFormat = (tick: number) => assignedToNames.value[tick];
</script>

<template>
  <div class="m-auto">
    <VisXYContainer :data="data">
      <VisStackedBar :roundedCorners="8" orientation="horizontal" :x="x" :y="y" :color="color" />
      <VisAxis type="x" label="Forecast hours / Maximum hours" />
      <VisAxis type="y" :tickLine="false" :gridLine="false" :tickFormat="tickFormat" />
    </VisXYContainer>
  </div>
</template>
