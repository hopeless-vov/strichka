<script setup lang="ts">
withDefaults(
  defineProps<{
    aspectRatio?: '2/3' | '4/3' | '16/9'
  }>(),
  {
    aspectRatio: '4/3',
  },
)
</script>

<template>
  <div class="w-full">
    <div
      class="animate-pulse rounded-md bg-surface-elevated"
      :class="{
        'aspect-2/3': aspectRatio === '2/3',
        'aspect-4/3': aspectRatio === '4/3',
        'aspect-video': aspectRatio === '16/9',
      }"
    />
    <div class="mt-2 space-y-1">
      <div class="h-3.5 w-3/4 rounded bg-surface-elevated" />
      <div class="h-3 w-1/2 rounded bg-surface-elevated" />
    </div>
  </div>
</template>
