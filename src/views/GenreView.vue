<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardSkeleton from '@/components/ui/CardSkeleton.vue'
import Icon from '@/components/ui/Icon.vue'
import { useHome } from '@/composables/use-home'
import { useListStore } from '@/stores/list'
import { useShowsStore } from '@/stores/shows'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const showsStore = useShowsStore()
const listStore = useListStore()

const loading = ref(false)
const { load } = useHome()

const genreKey = computed(() => route.params.key as string)
const genreRow = computed(() => showsStore.genreRows.find((r) => t(`${r.key}.url`) === genreKey.value))
const title = computed(() => (genreRow.value ? t(`${genreRow.value.key}.title`) : ''))
const shows = computed(() => genreRow.value?.shows ?? [])

onMounted(async () => {
  if (!showsStore.genreRows.length) {
    loading.value = true
    await load()
    loading.value = false
  }
})

function browseShow(show: (typeof shows.value)[number]) {
  router.push({ name: 'browse', params: { id: show.id } })
}

function watchShow(show: (typeof shows.value)[number]) {
  router.push({ name: 'watch', query: { title: show.title, status: show.status ?? undefined } })
}
</script>

<template>
  <main class="min-h-screen pt-24 pb-12">
    <div class="mb-6 flex items-center gap-4 px-[4%]">
      <button
        class="flex cursor-pointer items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-white"
        @click="router.back()"
      >
        <Icon
          :icon="faChevronLeft"
          size="small"
        />
        {{ t('genre.back') }}
      </button>
    </div>

    <h1 class="mb-6 px-[4%] font-heading text-2xl font-bold text-white">
      {{ title }}
    </h1>

    <div
      v-if="loading"
      class="grid grid-cols-3 gap-3 px-[4%] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      <CardSkeleton
        v-for="n in 18"
        :key="n"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-3 gap-3 px-[4%] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
    >
      <Card
        v-for="show in shows"
        :key="show.id"
        :title="show.title"
        :image="show.image"
        :rating="show.rating"
        :runtime="show.runtime"
        :genres="show.genres"
        :in-list="listStore.has(show.id)"
        @click="browseShow(show)"
        @play="watchShow(show)"
        @add-to-list="listStore.toggle(show)"
      />
    </div>
  </main>
</template>
