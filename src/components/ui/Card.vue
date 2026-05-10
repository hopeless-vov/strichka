<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import { faPlay, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

withDefaults(
  defineProps<{
    title: string
    image?: string
    rating?: number | null
    runtime?: number | null
    genres?: string[]
  }>(),
  {
    image: undefined,
    rating: undefined,
    runtime: undefined,
    genres: () => [],
  },
)

const emit = defineEmits<{
  click: []
  play: []
  addToList: []
}>()
</script>

<template>
  <div
    class="group relative cursor-pointer transition-transform duration-300 ease-in-out hover:z-10 hover:scale-105"
    @click="emit('click')"
  >
    <div class="aspect-2/3 overflow-hidden rounded-md bg-surface-elevated group-hover:rounded-b-none">
      <img
        :src="image ?? 'https://placehold.co/300x450/18181b/52525b'"
        :alt="title"
        loading="lazy"
        class="h-full w-full object-cover"
      >
    </div>

    <div class="pointer-events-none absolute left-0 right-0 top-full z-20 translate-y-0 rounded-b-md bg-surface/90 p-3 opacity-0 shadow-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
      <div class="mb-2 flex items-center gap-2">
        <Button
          color="primary"
          size="small"
          :icon="faPlay"
          pill
          @click.stop="emit('play')"
        />

        <Button
          color="secondary"
          size="small"
          :icon="faPlus"
          pill
          @click.stop="emit('addToList')"
        />
      </div>

      <h4 class="mb-1.5 line-clamp-1 text-sm font-semibold text-white">
        {{ title }}
      </h4>

      <div class="flex items-center gap-1.5 text-xs text-muted">
        <div class="flex items-center gap-1 text-rating">
          <Icon
            :icon="faStar"
            size="small"
          />
          <span class="font-bold">{{ rating ?? t('card.noRating') }}</span>
        </div>
        <span>{{ t('card.separator') }}</span>
        <span>{{ runtime ?? 45 }}{{ t('card.minutesSuffix') }}</span>
        <template v-if="genres.length">
          <span>{{ t('card.separator') }}</span>
          <span class="line-clamp-1">{{ genres[0] }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
