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
  base: 'relative text-sm font-medium transition-colors duration-200',
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
    <span
      v-if="active"
      class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-white hidden md:block"
    />
  </RouterLink>
</template>
s