<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import { useListStore } from '@/stores/list'
import { useShowsStore } from '@/stores/shows'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const listStore = useListStore()
const showsStore = useShowsStore()

function watchShow(show: { title: string; status?: string | null }) {
  router.push({ name: 'watch', query: { title: show.title, status: show.status ?? undefined } })
}

function browseShow(show: (typeof listStore.items)[number]) {
  showsStore.selectShow(show)
  router.push({ name: 'browse' })
}
</script>

<template>
  <main class="min-h-screen pt-24 pb-12">
    <h1 class="mb-6 px-[4%] font-heading text-2xl font-bold text-white">
      {{ t('pages.list') }}
    </h1>

    <!-- Grid -->
    <div
      v-if="listStore.items.length"
      class="grid grid-cols-3 gap-3 px-[4%] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      <Card
        v-for="show in listStore.items"
        :key="show.id"
        :title="show.title"
        :image="show.image"
        :rating="show.rating"
        :runtime="show.runtime"
        :genres="show.genres"
        :in-list="true"
        @click="browseShow(show)"
        @play="watchShow(show)"
        @add-to-list="listStore.remove(show.id)"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="px-[4%] pt-8 text-muted"
    >
      <p class="mb-2 text-white">
        {{ t('list.empty') }}
      </p>
      <p>{{ t('list.emptySub') }}</p>
    </div>
  </main>
</template>
