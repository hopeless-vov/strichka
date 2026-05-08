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
    genre?: string | null
  }>(),
  {
    image: undefined,
    rating: undefined,
    runtime: undefined,
    genre: undefined,
  },
)

const emit = defineEmits<{
  click: []
  addToList: []
}>()
</script>

<template>
  <div
    class="group relative cursor-pointer transition-transform duration-300 ease-in-out hover:z-10 hover:scale-105"
    @click="emit('click')"
  >
    <div class="aspect-video overflow-hidden rounded-md bg-zinc-800">
      <img
        :src="image ?? 'https://placehold.co/320x180/18181b/52525b'"
        :alt="title"
        class="h-full w-full object-cover"
      >
      <h4 class="absolute bottom-0 left-0 right-0 line-clamp-1 p-2 text-xs font-medium text-white transition-opacity duration-200 group-hover:opacity-0">
        {{ title }}
      </h4>
    </div>

    <div class="pointer-events-none absolute left-0 right-0 top-full z-20 translate-y-0 rounded-b-md bg-zinc-900 p-3 opacity-0 shadow-xl transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
      <div class="mb-2 flex items-center gap-2">
        <Button
          color="primary"
          size="small"
          :icon="faPlay"
          pill
          @click.stop="emit('click')"
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

      <div class="flex items-center gap-1.5 text-xs text-zinc-400">
        <div class="flex items-center gap-1 text-yellow-500">
          <Icon
            :icon="faStar"
            size="small"
          />
          <span class="font-bold">{{ rating ?? t('card.noRating') }}</span>
        </div>
        <span>{{ t('card.separator') }}</span>
        <span>{{ runtime ?? 45 }}{{ t('card.minutesSuffix') }}</span>
        <template v-if="genre">
          <span>{{ t('card.separator') }}</span>
          <span class="line-clamp-1">{{ genre }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
