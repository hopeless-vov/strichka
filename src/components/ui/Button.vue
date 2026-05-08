<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { tv } from 'tailwind-variants'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'secondary' | 'ghost'
    size?: 'large' | 'small'
    hug?: boolean
    pill?: boolean
    icon?: IconDefinition
    iconPosition?: 'left' | 'right'
    active?: boolean
  }>(),
  {
    color: 'secondary',
    size: 'large',
    hug: true,
    pill: false,
    icon: undefined,
    iconPosition: 'left',
    active: false,
  },
)

const slots = defineSlots<{ default?(): unknown }>()

const iconVariant = computed(() => {
  if (!props.icon) return undefined
  if (!slots.default) return 'icon-only'
  return props.iconPosition
})

const button = tv({
  base: 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 cursor-pointer select-none disabled:cursor-not-allowed',
  variants: {
    color: {
      primary:
        'bg-red-600 text-white hover:bg-red-500 active:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500',
      secondary:
        'border border-zinc-700 bg-transparent text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/50 active:bg-zinc-800 disabled:border-zinc-800 disabled:text-zinc-600',
      ghost:
        'bg-transparent text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100 active:bg-zinc-800 disabled:text-zinc-600',
    },
    size: {
      large: 'h-11 text-sm',
      small: 'h-8 text-xs',
    },
    pill: {
      true: 'rounded-full',
      false: 'rounded-lg',
    },
    hug: {
      true: '',
      false: 'w-full',
    },
    iconOnly: {
      true: '',
      false: '',
    },
    active: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Padding for buttons with text
    { iconOnly: false, size: 'large', class: 'px-6' },
    { iconOnly: false, size: 'small', class: 'px-4' },
    // Icon-only: square (only when hug, otherwise stretches full width)
    { iconOnly: true, hug: true, size: 'large', class: 'w-11' },
    { iconOnly: true, hug: true, size: 'small', class: 'w-8' },
    // Active state overrides
    { active: true, color: 'primary', class: 'bg-red-700' },
    { active: true, color: 'secondary', class: 'border-zinc-600 bg-zinc-800 text-zinc-100' },
    { active: true, color: 'ghost', class: 'bg-zinc-800 text-zinc-100' },
  ],
})
</script>

<template>
  <button
    type="button"
    :class="button({ color, size, hug, pill, active, iconOnly: iconVariant === 'icon-only' })"
  >
    <Icon
      v-if="icon && iconVariant !== 'right'"
      :icon="icon"
      :size="size === 'small' ? 'small' : 'medium'"
    />
    <slot />
    <Icon
      v-if="icon && iconVariant === 'right'"
      :icon="icon"
      :size="size === 'small' ? 'small' : 'medium'"
    />
  </button>
</template>
