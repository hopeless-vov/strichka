<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    image?: string
    aspectRatio?: '2/3' | '4/3' | '16/9'
  }>(),
  {
    subtitle: undefined,
    image: undefined,
    aspectRatio: '4/3',
  },
)

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <div
    class="group cursor-pointer"
    @click="emit('click')"
  >
    <div
      class="overflow-hidden rounded-md bg-surface-elevated transition-transform duration-200 group-hover:scale-102"
      :class="{
        'aspect-2/3': aspectRatio === '2/3',
        'aspect-4/3': aspectRatio === '4/3',
        'aspect-video': aspectRatio === '16/9',
      }"
    >
      <img
        v-if="image"
        :src="image"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover"
      >
      <div
        v-else
        class="flex h-full w-full items-center justify-center text-sm text-muted"
      >
        {{ t('browse.noImage') }}
      </div>
    </div>
    <div class="mt-2">
      <h4 class="line-clamp-1 text-sm font-medium text-white">
        {{ title }}
      </h4>
      <p
        v-if="subtitle"
        class="line-clamp-1 text-xs text-muted"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>
