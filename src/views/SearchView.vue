<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
</script>

<template>
  <main class="min-h-screen pt-24 pb-12">
    <h1 class="px-20 text-4xl font-bold text-white">
      {{ t('pages.search', { q: route.query.q }) }}
    </h1>
  </main>
</template>
