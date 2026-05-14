<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ genre: string }>()

const slug = computed(() => props.genre.toLowerCase().replace(/[\s/]+/g, '-'))
</script>

<template>
  <RouterLink
    :to="{ name: 'genre', params: { key: slug } }"
    class="rounded-sm border border-white/20 px-2.5 py-1 text-xs text-white/60 transition-colors hover:border-white/50 hover:text-white"
  >
    {{ genre }}
  </RouterLink>
</template>
