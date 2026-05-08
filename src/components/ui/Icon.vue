<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { tv } from 'tailwind-variants'

withDefaults(
  defineProps<{
    icon: IconDefinition
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    size: 'medium',
  },
)

const box = tv({
  base: 'inline-flex flex-none items-center justify-center box-border!',
  variants: {
    size: {
      small: 'size-4 p-0.5',
      medium: 'size-6 p-1',
      large: 'size-10 p-2',
    },
  },
})
</script>

<template>
  <span :class="box({ size })">
    <FontAwesomeIcon
      :icon="icon"
      class="w-full! h-full!"
    />
  </span>
</template>
