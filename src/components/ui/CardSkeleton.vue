<script setup lang="ts">
const widths = ['w-1/2', 'w-3/5', 'w-2/3', 'w-3/4', 'w-4/5']
const titleWidth = widths[Math.floor(Math.random() * widths.length)]
</script>

<template>
  <div class="w-full flex-none">
    <div class="mb-3 aspect-2/3 animate-pulse rounded-lg bg-zinc-800" />
    <div :class="['mb-2 h-4 animate-pulse rounded bg-zinc-800', titleWidth]" />
    <div class="flex items-center gap-2">
      <div class="h-3 w-8 animate-pulse rounded bg-zinc-800" />
      <div class="h-3 w-10 animate-pulse rounded bg-zinc-800" />
      <div class="h-3 w-12 animate-pulse rounded bg-zinc-800" />
    </div>
  </div>
</template>
