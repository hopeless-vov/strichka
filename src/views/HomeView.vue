<script setup lang="ts">
import GenreCarousel from '@/components/GenreCarousel.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dramaShows = [
  { id: 1, title: 'Breaking Bad', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/0/2400.jpg', rating: 9.5, runtime: 47, genre: 'Drama' },
  { id: 2, title: 'The Last of Us', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/468/1171064.jpg', rating: 8.8, runtime: 60, genre: 'Drama' },
  { id: 3, title: 'Severance', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/435/1089684.jpg', rating: 8.7, runtime: 55, genre: 'Thriller' },
  { id: 4, title: 'The Bear', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/421/1054160.jpg', rating: 8.5, runtime: 30, genre: 'Drama' },
  { id: 5, title: 'Succession', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/458/1145652.jpg', rating: 8.9, runtime: 60, genre: 'Drama' },
  { id: 6, title: 'Better Call Saul', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/424/1060253.jpg', rating: 9.0, runtime: 50, genre: 'Drama' },
  { id: 7, title: 'The Wire', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/327/819042.jpg', rating: 9.3, runtime: 60, genre: 'Drama' },
  { id: 8, title: 'True Detective', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/490/1226498.jpg', rating: 8.4, runtime: 60, genre: 'Drama' },
  { id: 9, title: 'Fargo', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/474/1185900.jpg', rating: 8.6, runtime: 53, genre: 'Drama' },
  { id: 10, title: 'Ozark', image: 'https://static.tvmaze.com/uploads/images/medium_portrait/395/988498.jpg', rating: 8.5, runtime: 60, genre: 'Drama' },
]
</script>

<template>
  <main class="min-h-screen space-y-10 pt-24 pb-12 overflow-x-hidden">
    <h1
      class="px-20 text-4xl font-bold text-white"
    >
      {{ t('pages.main') }}
    </h1>

    <GenreCarousel
      title="Drama"
      :shows="dramaShows"
    />
  </main>
</template>
