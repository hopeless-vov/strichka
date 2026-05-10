<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { tv } from 'tailwind-variants'
import { computed, useId } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'text' | 'email' | 'password'
    disabled?: boolean
    size?: 'large' | 'small'
    iconLeft?: IconDefinition
    iconRight?: IconDefinition
    maxLength?: number
    placeholder?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    size: 'large',
    iconLeft: undefined,
    iconRight: undefined,
    maxLength: undefined,
    placeholder: '',
  },
)

defineSlots<{
  label(): unknown
}>()

const modelValue = defineModel<string>()
const inputId = useId()

const wrapperVariants = tv({
  base: 'flex items-center rounded-lg border bg-surface/60 transition-colors duration-200 border-surface-hover focus-within:border-muted cursor-text',
  variants: {
    disabled: {
      true: 'opacity-50',
      false: '',
    },
    size: {
      large: 'h-14',
      small: 'h-11',
    },
  },
})

const labelVariants = tv({
  base: 'absolute z-10 left-4 pointer-events-none select-none transition-all duration-150 text-muted',
  variants: {
    size: {
      large: [
        'text-sm top-1/2 -translate-y-1/2',
      ].join(' '),
      small: [
        'text-sm top-1/2 -translate-y-1/2',
      ].join(' '),
    },
  },
})

const inputVariants = tv({
  base: 'h-full w-full bg-transparent text-sm text-white focus:outline-none disabled:cursor-not-allowed ',
  variants: {
    size: {
      large: 'py-5',
      small: 'py-3',
    },
    hasLeftIcon: {
      true: 'pl-2',
      false: 'pl-4',
    },
    hasRightIcon: {
      true: 'pr-2',
      false: 'pr-4',
    },
  },
})

const wrapperClass = computed(() => wrapperVariants({ size: props.size, disabled: props.disabled}))
const labelClass = computed(() => labelVariants({ size: props.size }))
const inputClass = computed(() => inputVariants({ size: props.size, hasLeftIcon: !!props.iconLeft, hasRightIcon: !!props.iconRight }))
</script>

<template>
  <div>
    <label
      :for="inputId"
      :class="wrapperClass"
    >
      <div
        v-if="props.iconLeft"
        class="shrink-0 pl-4 text-muted"
      >
        <Icon
          :icon="props.iconLeft"
          size="small"
        />
      </div>

      <div class="relative h-full flex-1">
        <input
          :id="inputId"
          v-model="modelValue"
          :type="props.type"
          :maxlength="props.maxLength"
          :disabled="props.disabled"
          :placeholder="placeholder"
          :class="inputClass"
        >
        <span
          :class="labelClass"
        >
          <slot name="label" />
        </span>
      </div>

      <div
        v-if="props.iconRight"
        class="shrink-0 pr-4 text-muted"
      >
        <Icon
          :icon="props.iconRight"
          size="small"
        />
      </div>
    </label>
  </div>
</template>
