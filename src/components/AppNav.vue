<script setup lang="ts">
import Button from '@/components/ui/Button.vue'
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import NavLink from '@/components/ui/NavLink.vue'
import TextInput from '@/components/ui/TextInput.vue'
import { faMagnifyingGlass, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')

watch(search, (value) => {
  if (value.trim()) {
    router.push({ name: 'search', query: { q: value } })
  } else {
    router.push('/')
  }
})

const navItems = [
  { to: '/', key: 'home' },
  { to: '/shows', key: 'shows' },
  { to: '/movies', key: 'movies' },
  { to: '/new', key: 'new' },
] as const
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
    <div class="flex items-center gap-8">
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 group"
      >
        <span class="text-2xl font-black tracking-tighter text-white">
          {{ t('nav.brand') }}
        </span>
      </RouterLink>

      <div class="hidden items-center gap-6 md:flex">
        <NavLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :active="route.path === item.to"
        >
          {{ t(`nav.${item.key}`) }}
        </NavLink>
      </div>
    </div>

    <div class="flex items-center gap-5">
      <div class="w-12 overflow-hidden transition-[width] duration-300 focus-within:w-44 md:focus-within:w-56 md:w-44">
        <TextInput
          v-model="search"
          size="small"
          placeholder="Search..."
          :icon-left="faMagnifyingGlass"
        />
      </div>

      <DropdownMenu>
        <template #trigger>
          <div class="flex size-8 items-center justify-center rounded bg-linear-to-tr from-red-600 to-purple-600 text-xs font-bold text-white">
            {{ t('nav.userInitial') }}
          </div>
        </template>
        <div class="md:hidden">
          <NavLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :active="route.path === item.to"
            class="flex px-4 py-3"
          >
            {{ t(`nav.${item.key}`) }}
          </NavLink>
          <hr class="border-zinc-800">
        </div>
        <Button
          color="ghost"
          :icon="faSignOut"
          :hug="false"
        >
          {{ t('nav.logout') }}
        </Button>
      </DropdownMenu>
    </div>
  </nav>
</template>
