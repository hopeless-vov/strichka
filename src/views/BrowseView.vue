<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import { useShowsStore } from '@/stores/shows'
import { faChevronLeft, faPlay, faStar } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const showsStore = useShowsStore()

const show = computed(() => showsStore.selectedShow)
const summary = computed(() => show.value?.summary?.replace(/<[^>]+>/g, '') ?? '')

function watch() {
  if (!show.value) return
  router.push({ name: 'watch', query: { title: show.value.title, status: show.value.status ?? undefined } })
}
</script>

<template>
  <main
    v-if="show"
    class="min-h-screen bg-surface"
  >
    <!-- Ambient background -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <img
        v-if="show.image"
        :src="show.image"
        aria-hidden="true"
        class="h-full w-full scale-125 object-cover object-top blur-3xl opacity-10"
      >
    </div>

    <div class="relative z-10 px-4 pt-28 pb-16 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <!-- Back -->
      <button
        class="mb-8 flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        @click="router.back()"
      >
        <Icon
          :icon="faChevronLeft"
          size="small"
        />
        {{ t('browse.back') }}
      </button>

      <!-- Content -->
      <div class="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
        <!-- Poster -->
        <div class="shrink-0 mx-auto md:mx-0 w-44 sm:w-52 md:w-56 lg:w-64 xl:w-72">
          <img
            v-if="show.image"
            :src="show.image"
            :alt="show.title"
            class="w-full rounded-sm shadow-2xl shadow-black/60"
          >
          <div
            v-else
            class="aspect-2/3 w-full rounded-sm bg-surface-elevated"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <span
            v-if="show.status"
            class="mb-3 inline-block text-xs font-medium tracking-widest uppercase text-accent"
          >
            {{ show.status }}
          </span>

          <h1 class="font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl mb-4">
            {{ show.title }}
          </h1>

          <!-- Meta -->
          <div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span
              v-if="show.rating"
              class="flex items-center gap-1.5 text-sm font-bold text-rating"
            >
              <Icon
                :icon="faStar"
                size="small"
              /> {{ show.rating }}
            </span>
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
          </div>

          <!-- Genres -->
          <div
            v-if="show.genres.length"
            class="mb-6 flex flex-wrap gap-2"
          >
            <span
              v-for="genre in show.genres"
              :key="genre"
              class="rounded-sm border border-white/20 px-2.5 py-1 text-xs text-white/60"
            >{{ genre }}</span>
          </div>

          <!-- Summary -->
          <p
            v-if="summary"
            class="mb-8 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"
          >
            {{ summary }}
          </p>

          <Button
            color="primary"
            :icon="faPlay"
            @click="watch"
          >
            {{ t('hero.watch') }}
          </Button>
        </div>
      </div>
    </div>
  </main>

  <!-- Fallback if navigated directly with no store state -->
  <main
    v-else
    class="flex min-h-screen items-center justify-center bg-surface"
  >
    <button
      class="flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
      @click="router.push({ name: 'home' })"
    >
      <Icon
        :icon="faChevronLeft"
        size="small"
      />
      {{ t('browse.back') }}
    </button>
  </main>
</template>
