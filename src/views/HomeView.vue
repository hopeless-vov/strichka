<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<template>
  <main class="min-h-screen space-y-10 pt-24 pb-12 overflow-x-hidden">
    <h1
      class="px-20 text-4xl font-bold text-white"
    >
      {{ t('pages.main') }}
    </h1>
  </main>
</template>
