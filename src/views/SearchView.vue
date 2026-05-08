<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardSkeleton from '@/components/ui/CardSkeleton.vue'
import { useSearch } from '@/composables/use-search'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const { results, loading, search } = useSearch()

const query = computed(() => typeof route.query.q === 'string' ? route.query.q : '')

watch(query, (q) => search(q), { immediate: true })

const showEmpty = computed(() => !loading.value && query.value && results.value.length === 0)
</script>

<template>
  <main class="min-h-screen pt-24 pb-12">
    <h1 class="mb-6 px-[4%] text-2xl font-bold text-white">
      {{ t('pages.search', { q: query }) }}
    </h1>
    <!-- Skeleton -->
    <div
      v-if="loading"
      class="grid grid-cols-2 gap-3 px-[4%] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      <CardSkeleton
        v-for="n in 12"
        :key="n"
      />
    </div>

    <!-- Results grid -->
    <div
      v-else-if="results.length"
      class="grid grid-cols-2 gap-3 px-[4%] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      <Card
        v-for="show in results"
        :key="show.id"
        :title="show.title"
        :image="show.image"
        :rating="show.rating"
        :runtime="show.runtime"
        :genres="show.genres"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="showEmpty"
      class="px-[4%] pt-8 text-zinc-400"
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
