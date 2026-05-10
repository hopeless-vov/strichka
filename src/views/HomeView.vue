<script setup lang="ts">
import GenreCarousel from '@/components/GenreCarousel.vue'
import HeroSection from '@/components/HeroSection.vue'
import { useHome } from '@/composables/use-home'
import { useShowsStore } from '@/stores/shows'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const showsStore = useShowsStore()
const { rows, loading, load, heroShow } = useHome()

onMounted(load)

function onWatch({ title, status }: { title: string; status?: string }) {
  if (!heroShow.value) return
  router.push({ name: 'watch', query: { title, status } })
}

function onInfo() {
  if (!heroShow.value) return
  showsStore.selectShow(heroShow.value)
  router.push({ name: 'browse' })
}
</script>

<template>
  <main class="min-h-screen overflow-x-clip">
    <HeroSection
      :show="heroShow"
      :loading="loading"
      @watch="onWatch"
      @info="onInfo"
    />

    <div class="space-y-10 pt-10 pb-12">
      <template v-if="loading">
        <GenreCarousel
          v-for="n in 6"
          :key="n"
          title=""
          :shows="[]"
          :loading="true"
        />
      </template>
      <template v-else>
        <GenreCarousel
          v-for="row in rows"
          :key="row.key"
          :title="t(`${row.key}.title`)"
          :shows="row.shows.slice(0, 30)"
          :genre-key="row.key"
        />
      </template>
    </div>
  </main>
</template>
