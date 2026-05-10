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
        'bg-accent text-white hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-hover disabled:text-muted/50',
      secondary:
        'border border-surface-hover bg-transparent text-zinc-100 hover:border-muted/40 hover:bg-surface-elevated/50 active:bg-surface-elevated disabled:border-surface-elevated disabled:text-muted/60',
      ghost:
        'bg-transparent text-muted hover:bg-surface-elevated/60 hover:text-zinc-100 active:bg-surface-elevated disabled:text-muted/60',
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
    { active: true, color: 'primary', class: 'bg-accent-active' },
    { active: true, color: 'secondary', class: 'border-muted/40 bg-surface-elevated text-zinc-100' },
    { active: true, color: 'ghost', class: 'bg-surface-elevated text-zinc-100' },
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
