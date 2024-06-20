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
  <Card class="w-72 h-40 cursor-pointer border-2 hover:bg-card-foreground/5" as-child>
    <nuxt-link :to="toRoute">
      <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    </nuxt-link>
  </Card>
</template>