<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import Icon from '@/components/ui/Icon.vue'
import MediaCard from '@/components/ui/MediaCard.vue'
import MediaCardSkeleton from '@/components/ui/MediaCardSkeleton.vue'
import { useShowDetails } from '@/composables/use-show-details'
import { useListStore } from '@/stores/list'
import { faCheck, faChevronLeft, faPlay, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { computed, toRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const listStore = useListStore()

const showId = toRef(() => route.params.id as string | undefined)
const { show, loading, error, selectedSeason, currentSeasonEpisodes } = useShowDetails(showId)

const summary = computed(() => show.value?.summary?.replace(/<[^>]+>/g, '') ?? '')

function watch() {
  if (!show.value) return
  router.push({ name: 'watch', query: { title: show.value.title, status: show.value.status ?? undefined } })
}
</script>

<template>
  <main class="min-h-screen bg-surface">
    <!-- Loading state -->
    <div
      v-if="loading"
      class="relative z-10 px-4 pt-28 pb-16 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div class="mb-8 h-5 w-16 animate-pulse rounded bg-surface-elevated" />

      <div class="flex flex-col gap-8 md:flex-row md:gap-12 lg:gap-16">
        <div class="shrink-0 mx-auto md:mx-0 w-44 sm:w-52 md:w-56 lg:w-64 xl:w-72">
          <div class="aspect-2/3 w-full animate-pulse rounded-sm bg-surface-elevated" />
        </div>

        <div class="flex-1 min-w-0 space-y-4">
          <div class="h-4 w-20 animate-pulse rounded bg-surface-elevated" />
          <div class="h-10 w-3/4 animate-pulse rounded bg-surface-elevated" />
          <div class="h-4 w-1/2 animate-pulse rounded bg-surface-elevated" />
          <div class="h-20 w-full animate-pulse rounded bg-surface-elevated" />
        </div>
      </div>

      <div class="mt-12 space-y-4">
        <div class="h-6 w-24 animate-pulse rounded bg-surface-elevated" />
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <MediaCardSkeleton
            v-for="i in 6"
            :key="i"
          />
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <p class="font-heading text-8xl font-bold text-white/10 mb-6 select-none">
        {{ t('browse.errorCode') }}
      </p>
      <h1 class="font-heading text-2xl font-bold text-white mb-3">
        {{ t('browse.errorTitle') }}
      </h1>
      <p class="text-sm text-muted mb-8 max-w-sm">
        {{ t('browse.errorSub') }}
      </p>
      <Button
        color="primary"
        :icon="faChevronLeft"
        @click="router.push({ name: 'home' })"
      >
        {{ t('browse.backToHome') }}
      </Button>
    </div>

    <!-- Show details -->
    <template v-else-if="show">
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
              class="mb-6 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"
            >
              {{ summary }}
            </p>

            <!-- Cast -->
            <p
              v-if="show.cast.length"
              class="mb-8 text-sm text-white/70"
            >
              <span class="font-semibold text-white">{{ t('browse.cast') }}{{ t('browse.castSeparator') }}</span>
              {{ show.cast.slice(0, 10).join(', ') }}
            </p>

            <div class="flex items-center gap-3">
              <Button
                color="primary"
                :icon="faPlay"
                @click="watch"
              >
                {{ t('hero.watch') }}
              </Button>

              <Button
                :color="listStore.has(show.id) ? 'primary' : 'secondary'"
                :icon="listStore.has(show.id) ? faCheck : faPlus"
                @click="listStore.toggle(show)"
              >
                {{ listStore.has(show.id) ? t('browse.removeFromList') : t('browse.addToList') }}
              </Button>
            </div>
          </div>
        </div>

        <!-- Seasons & Episodes -->
        <div
          v-if="show.seasons.length"
          class="mt-12"
        >
          <!-- Season selector -->
          <div class="mb-6 flex flex-wrap items-center gap-2">
            <Button
              v-for="season in show.seasons"
              :key="season.id"
              size="small"
              :color="selectedSeason === season.number ? 'primary' : 'secondary'"
              @click="selectedSeason = season.number"
            >
              {{ t('browse.seasonNumber', { n: season.number }) }}
            </Button>
          </div>

          <!-- Episodes grid -->
          <div
            v-if="currentSeasonEpisodes.length"
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            <MediaCard
              v-for="ep in currentSeasonEpisodes"
              :key="ep.id"
              :title="`${ep.episodeNumber}. ${ep.name}`"
              :subtitle="ep.airdate ?? undefined"
              :image="ep.image"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Fallback -->
    <div
      v-else
      class="flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <p class="font-heading text-8xl font-bold text-white/10 mb-6 select-none">
        {{ t('browse.errorCodeFallback') }}
      </p>
      <h1 class="font-heading text-2xl font-bold text-white mb-3">
        {{ t('browse.errorTitle') }}
      </h1>
      <p class="text-sm text-muted mb-8 max-w-sm">
        {{ t('browse.errorSub') }}
      </p>
      <Button
        color="primary"
        :icon="faChevronLeft"
        @click="router.push({ name: 'home' })"
      >
        {{ t('browse.backToHome') }}
      </Button>
    </div>
  </main>
</template>
