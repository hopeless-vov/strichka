<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import type { Show } from '@/types/show'
import { faCircleInfo, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  show?: Show | null
  loading?: boolean
}>()

const emit = defineEmits<{
  watch: [id: number | string]
  info: [id: number | string]
}>()

const summary = computed(() => props.show?.summary?.replace(/<[^>]+>/g, '') ?? '')
</script>

<template>
  <!-- Skeleton -->
  <div
    v-if="loading"
    class="relative min-h-[60vh] md:min-h-[80vh] bg-surface-elevated animate-pulse"
  >
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-surface to-transparent" />
  </div>

  <!-- Hero -->
  <section
    v-else-if="show"
    class="relative overflow-hidden bg-surface-elevated"
  >
    <!-- Ambient blurred poster -->
    <img
      v-if="show.image"
      :src="show.image"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover object-top blur-3xl opacity-25"
    >
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-surface-elevated/60" />

    <!-- Content -->
    <div
      class="relative z-10 flex flex-col items-center gap-8
             px-4 pt-28 pb-20
             sm:px-6
             md:flex-row md:items-center md:gap-12 md:px-8 md:pt-36 md:pb-28
             lg:px-12 lg:gap-16
             xl:px-16"
    >
      <!-- Left: text -->
      <div class="flex-1 min-w-0 text-center md:text-left order-2 md:order-1">
        <span
          v-if="show.status"
          class="mb-3 inline-block text-xs font-medium tracking-widest uppercase text-accent"
        >
          {{ show.status }}
        </span>

        <h1
          class="font-heading text-4xl font-bold leading-tight text-white
                 sm:text-5xl md:text-5xl lg:text-6xl mb-4"
        >
          {{ show.title }}
        </h1>

        <div class="mb-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
          <span
            v-if="show.rating"
            class="text-sm font-bold text-rating items-center flex"
          >
            <Icon
              :icon="faStar"
              size="small"
            />
            {{ show.rating }}</span>
          <span
            v-if="show.year"
            class="text-sm text-white/50"
          >{{ show.year }}</span>
          <span
            v-if="show.runtime"
            class="text-sm text-white/50"
          >{{ show.runtime }}{{ t('card.minutesSuffix') }}</span>
          <span
            v-if="show.network"
            class="text-sm text-white/50"
          >{{ show.network }}</span>
          <span
            v-for="genre in show.genres.slice(0, 3)"
            :key="genre"
            class="rounded-sm border border-white/20 px-2 py-px text-xs text-white/60"
          >{{ genre }}</span>
        </div>

        <p
          v-if="summary"
          class="mb-8 line-clamp-2 text-sm text-white/65 md:line-clamp-3 md:text-base max-w-xl mx-auto md:mx-0"
        >
          {{ summary }}
        </p>

        <div class="flex items-center justify-center gap-3 md:justify-start">
          <Button
            color="primary"
            :icon="faPlay"
            @click="emit('watch', show.id)"
          >
            {{ t('hero.watch') }}
          </Button>
          <Button
            color="secondary"
            :icon="faCircleInfo"
            @click="emit('info', show.id)"
          >
            {{ t('hero.moreInfo') }}
          </Button>
        </div>
      </div>

      <!-- Right: poster -->
      <div class="shrink-0 order-1 md:order-2 w-36 sm:w-40 md:w-48 lg:w-56 xl:w-64">
        <img
          v-if="show.image"
          :src="show.image"
          :alt="show.title"
          class="w-full rounded-sm shadow-2xl shadow-black/70"
        >
      </div>
    </div>

    <!-- Bottom blend into page -->
    <div class="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-surface to-transparent" />
  </section>
</template>
