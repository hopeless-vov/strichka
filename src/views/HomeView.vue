<script setup lang="ts">
import GenreCarousel from '@/components/GenreCarousel.vue'
import HeroSection from '@/components/HeroSection.vue'
import { useHome } from '@/composables/use-home'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const { rows, loading, load, heroShow } = useHome()

onMounted(load)

function onWatch({ title, status }: { title: string; status?: string }) {
  if (!heroShow.value) return
  router.push({
    name: 'watch',
    query: {
      title,
      status,
    },
  })
}
</script>

<template>
  <main class="min-h-screen overflow-x-clip">
    <HeroSection
      :show="heroShow"
      :loading="loading"
      @watch="onWatch"
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
          :title="t(row.key)"
          :shows="row.shows.slice(0, 30)"
        />
      </template>
    </div>
  </main>
</template>
