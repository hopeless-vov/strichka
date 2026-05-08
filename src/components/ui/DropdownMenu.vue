<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ref, useId } from 'vue'

defineSlots<{
  trigger(): unknown
  default(): unknown
}>()

const open = ref(false)
const panelId = useId()

function toggle() {
  open.value = !open.value
}

function onFocusOut(e: FocusEvent) {
  if (!(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) {
    open.value = false
  }
}
</script>

<template>
  <div
    class="relative"
    @focusout="onFocusOut"
  >
    <button
      type="button"
      class="flex items-center gap-1 rounded-lg p-1 transition-colors duration-200 hover:bg-zinc-800/50 cursor-pointer"
      :aria-expanded="open"
      :aria-controls="panelId"
      aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger" />
      <Icon
        :icon="faChevronDown"
        size="small"
        :class="['text-zinc-400 transition-transform duration-200', open && 'rotate-180']"
      />
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="open"
        :id="panelId"
        class="absolute right-0 top-full z-50 mt-3 min-w-56 origin-top-right overflow-hidden rounded-lg border border-zinc-700/50 bg-zinc-900 shadow-xl shadow-black/50"
        @click="open = false"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
