<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardSkeleton from '@/components/ui/CardSkeleton.vue'
import Icon from '@/components/ui/Icon.vue'
import { useCarousel } from '@/composables/use-carousel'
import { useListStore } from '@/stores/list'
import { useShowsStore } from '@/stores/shows'
import type { Show } from '@/types/show'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRouter } from 'vue-router'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    title: string
    shows?: Show[]
    loading?: boolean
    genreKey?: string
  }>(),
  {
    shows: () => [],
    loading: false,
    genreKey: undefined,
  },
)

defineEmits<{
  showClick: [id: number | string]
  showAddToList: [id: number | string]
}>()

const router = useRouter()
const showsStore = useShowsStore()
const listStore = useListStore()

const { list, cardWidthPercent, translateX, hasTransition, isNavigating, currentPage, totalPages, next, prev, onTransitionEnd } =
  useCarousel<Show>(props.shows)

function watchShow(show: Show) {
  router.push({ name: 'watch', query: { title: show.title, status: show.status ?? undefined } })
}

function browseShow(show: Show) {
  showsStore.selectShow(show)
  router.push({ name: 'browse' })
}
</script>

<template>
  <section class="group/section relative has-[.group:hover]:z-10">
    <div class="flex justify-between items-center mb-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <RouterLink
        v-if="title"
        :to="genreKey ? `/genre/${t(`${genreKey}.url`)}` : '/'"
        class="font-heading text-lg font-bold text-white flex items-center gap-2"
      >
        {{ title }}
        <Icon
          :icon="faChevronRight"
          size="small"
          class="text-muted"
        />
      </RouterLink>

      <span class="flex items-end gap-1 pb-px ">
        <span
          v-for="i in totalPages"
          :key="i"
          class="inline-block h-px w-3 transition-colors duration-300"
          :class="i - 1 === currentPage ? 'bg-white' : 'bg-white/40'"
        />
      </span>
    </div>
    
    <div class="group/row relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <button
        class="group/btn absolute left-0 top-0 z-10 flex h-full w-[4%] cursor-pointer items-center justify-center rounded-r-sm transition-all duration-200 [background:hsla(0,0%,8%,.5)] hover:[background:hsla(0,0%,8%,.7)]"
        :aria-label="t('carousel.scrollLeft')"
        @click="prev"
      >
        <Icon
          :icon="faChevronLeft"
          class="text-white opacity-100 transition-all duration-200 md:opacity-0 group-hover/row:opacity-100 group-hover/btn:scale-125"
        />
      </button>

      <div class="">
        <!-- Loading skeleton -->
        <div
          v-if="loading"
          class="flex"
        >
          <div
            v-for="n in 6"
            :key="n"
            class="shrink-0 px-2"
            :style="{ width: `calc(${cardWidthPercent}%)` }"
          >
            <CardSkeleton />
          </div>
        </div>

        <!-- Carousel track -->
        <!-- Need to have  pointer-events-none to keep interactions disabled during navigation.
          Otherwise it may break slide animation if I will do hover on card -->
        <div
          v-else
          ref="innerRef"
          class="flex"
          :class="{ 'pointer-events-none': isNavigating }"
          :style="{
            transform: `translateX(${translateX}%)`,
            transition: hasTransition ? 'transform 0.45s ease' : 'none',
          }"
          @transitionend="onTransitionEnd"
        >
          <div
            v-for="show in list"
            :key="show.id"
            class="shrink-0 px-2"
            :style="{ width: `calc(${cardWidthPercent}%)` }"
          >
            <Card
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
        </div>
      </div>

      <button
        class="group/btn absolute right-0 top-0 z-10 flex h-full w-[4%] cursor-pointer items-center justify-center rounded-l-sm transition-all duration-200 [background:hsla(0,0%,8%,.5)] hover:[background:hsla(0,0%,8%,.7)]"
        :aria-label="t('carousel.scrollRight')"
        @click="next"
      >
        <Icon
          :icon="faChevronRight"
          class="text-white opacity-100 transition-all duration-200 md:opacity-0 group-hover/row:opacity-100 group-hover/btn:scale-125"
        />
      </button>
    </div>
  </section>
</template>
