<script setup lang="ts">
import { tv } from 'tailwind-variants'
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to: string
    active?: boolean
  }>(),
  { active: false },
)

const link = tv({
  base: 'text-sm font-medium transition-colors duration-200',
  variants: {
    active: {
      true: 'text-white',
      false: 'text-muted hover:text-white',
    },
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    :class="link({ active })"
  >
    <slot />
  </RouterLink>
</template>
