<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  toRoute: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link :to="toRoute">
    <Card class="w-72 h-40 cursor-pointer border-2">
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
        <CardDescription>{{ description }}</CardDescription>
      </CardHeader>
    </Card>
  </router-link>
</template>