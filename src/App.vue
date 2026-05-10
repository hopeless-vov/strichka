<script setup lang="ts">
import AppNav from '@/components/AppNav.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <AppNav v-if="!route.meta.hideNav" />
  <RouterView v-slot="{ Component }">
    <Transition
      name="page"
      mode="out-in"
    >
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
