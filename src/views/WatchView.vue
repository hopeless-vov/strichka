<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const title = typeof route.query.title === 'string' ? route.query.title : ''
const status = typeof route.query.status === 'string' ? route.query.status : ''

const EMBED_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-black">
    <!-- Header bar -->
    <header class="flex items-center justify-between px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-17">
      <button
        class="flex cursor-pointer items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        @click="router.back()"
      >
        <Icon
          :icon="faChevronLeft"
          size="small"
        />
        {{ t('watch.back') }}
      </button>

      <span class="font-heading text-base font-bold tracking-widest uppercase text-white">
        {{ t('nav.brand') }}
      </span>
    </header>

    <!-- Video -->
    <div class="flex flex-1 flex-col items-center justify-center px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="w-full max-w-6xl">
        <div class="aspect-video w-full overflow-hidden rounded-sm shadow-2xl shadow-black">
          <iframe
            :src="EMBED_URL"
            class="h-full w-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowfullscreen
          />
        </div>

        <!-- Show info below video -->
        <div
          v-if="title"
          class="mt-5 flex items-center gap-3"
        >
          <h1 class="font-heading text-xl font-bold text-white sm:text-2xl">
            {{ title }}
          </h1>
          <span
            v-if="status"
            class="rounded-sm border border-white/20 px-2 py-px text-xs text-white/50"
          >{{ status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
