<script setup lang="ts">
import DropdownMenu from '@/components/ui/DropdownMenu.vue'
import Icon from '@/components/ui/Icon.vue'
import NavLink from '@/components/ui/NavLink.vue'
import TextInput from '@/components/ui/TextInput.vue'
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 0)

watch(search, (value) => {
  if (value.trim()) {
    router.push({ name: 'search', query: { q: value } })
  } else if (route.name === 'search') {
    router.push('/')
  }
})

watch(() => route.query.q, (q) => {
  search.value = typeof q === 'string' ? q : ''
})

const navItems = [
  { to: '/', key: 'home' },
  { to: '/my-list', key: 'list' },
] as const
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-8 lg:px-12 xl:px-16 backdrop-blur-md transition-[backdrop-filter] duration-300"
    :class="scrolled && 'md:backdrop-brightness-50'"
  >
    <div class="flex items-center gap-8">
      <RouterLink
        to="/"
        class="flex items-center gap-2.5 group"
      >
        <span class="relative flex size-2 shrink-0">
          <span class="absolute inline-flex size-full rounded-full bg-accent opacity-75 animate-ping" />
          <span class="relative size-2 rounded-full bg-accent" />
        </span>
        <span class="font-heading text-2xl font-bold tracking-widest uppercase text-white">
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

    <div class="flex items-center gap-5 group">
      <div class="w-12 overflow-hidden transition-[width] duration-300 focus-within:w-30 md:focus-within:w-56 md:w-44">
        <TextInput
          v-model="search"
          size="small"
          placeholder="Search..."
          :icon-left="faMagnifyingGlass"
        />
      </div>

      <DropdownMenu class="md:hidden">
        <template #trigger="{ open }">
          <Icon
            :icon="open ? faXmark : faBars"
            class="text-white transition-transform duration-200"
          />
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
          <hr class="border-surface-elevated">
        </div>
      </DropdownMenu>
    </div>
  </nav>
</template>
