<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center px-4 text-center bg-surface">
    <p class="font-heading text-8xl font-bold text-white/10 mb-6 select-none">
      {{ t('notFound.header') }}
    </p>
    <h1 class="font-heading text-2xl font-bold text-white mb-3">
      {{ t('notFound.title') }}
    </h1>
    <p class="text-sm text-muted mb-8 max-w-sm">
      {{ t('notFound.sub') }}
    </p>
    <Button
      color="primary"
      :icon="faHouse"
      @click="router.push({ name: 'home' })"
    >
      {{ t('notFound.cta') }}
    </Button>
  </main>
</template>
