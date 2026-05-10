<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardSkeleton from '@/components/ui/CardSkeleton.vue'
import { useSearch } from '@/composables/use-search'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { results, loading, search } = useSearch()

function watchShow(show: { title: string; status?: string | null }) {
  router.push({ name: 'watch', query: { title: show.title, status: show.status ?? undefined } })
}

const query = computed(() => typeof route.query.q === 'string' ? route.query.q : '')

watch(query, (q) => search(q), { immediate: true })

const showEmpty = computed(() => !loading.value && query.value && results.value.length === 0)
</script>

<template>
  <main class="min-h-screen pt-24 pb-12">
    <h1 class="mb-6 px-[4%] font-heading text-2xl font-bold text-white">
      {{ t('pages.search', { q: query }) }}
    </h1>
    <!-- Skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-3 gap-3 px-[4%] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      <CardSkeleton
        v-for="n in 14"
        :key="n"
      />
    </div>

    <!-- Results grid -->
    <div
      v-else-if="results.length"
      class="grid grid-cols-3 gap-3 px-[4%] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      <Card
        v-for="show in results"
        :key="show.id"
        :title="show.title"
        :image="show.image"
        :rating="show.rating"
        :runtime="show.runtime"
        :genres="show.genres"
        @click="watchShow(show)"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="showEmpty"
      class="px-[4%] pt-8 text-muted"
    >
      <p class="mb-3 text-white">
        {{ t('search.noResults', { q: query }) }}
      </p>
      <p class="mb-2">
        {{ t('search.suggestions') }}
      </p>
      <ul class="list-disc space-y-1 pl-5">
        <li>{{ t('search.tip1') }}</li>
        <li>{{ t('search.tip2') }}</li>
        <li>{{ t('search.tip3') }}</li>
        <li>{{ t('search.tip4') }}</li>
      </ul>
    </div>
  </main>
</template>
