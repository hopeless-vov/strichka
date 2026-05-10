<script setup lang="ts">
import GenreCarousel from '@/components/GenreCarousel.vue'
import { useHome } from '@/composables/use-home'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { rows, loading, load } = useHome()

onMounted(load)
</script>

<template>
  <main class="min-h-screen space-y-10 pt-24 pb-12 overflow-x-clip">
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
  </main>
</template>
