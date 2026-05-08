<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import CardSkeleton from '@/components/ui/CardSkeleton.vue'
import Icon from '@/components/ui/Icon.vue'
import { useCarousel } from '@/composables/use-carousel'
import type { Show } from '@/types/show'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    title: string
    shows?: Show[]
    loading?: boolean
  }>(),
  {
    shows: () => [],
    loading: false,
  },
)

const emit = defineEmits<{
  showClick: [id: number | string]
  showAddToList: [id: number | string]
}>()

const { list, cardWidthPercent, translateX, hasTransition, next, prev, onTransitionEnd } =
  useCarousel<Show>(props.shows)
</script>

<template>
  <section>
    <h2 class="mb-4 text-lg font-bold text-white">
      {{ title }}
    </h2>

    <div class="group/row relative px-[4%]">
      <button
        class="group/btn absolute left-0 top-0 z-10 flex h-full w-[4%] cursor-pointer items-center justify-center rounded-r-sm transition-all duration-200 [background:hsla(0,0%,8%,.5)] hover:[background:hsla(0,0%,8%,.7)]"
        :aria-label="t('carousel.scrollLeft')"
        @click="prev"
      >
        <Icon
          :icon="faChevronLeft"
          class="text-white opacity-0 transition-all duration-200 group-hover/row:opacity-100 group-hover/btn:scale-125"
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
            class="w-44 shrink-0"
          >
            <CardSkeleton />
          </div>
        </div>

        <!-- Carousel track -->
        <div
          v-else
          ref="innerRef"
          class="flex"
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
              :genre="show.genre"
              @click="emit('showClick', show.id)"
              @add-to-list="emit('showAddToList', show.id)"
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
          class="text-white opacity-0 transition-all duration-200 group-hover/row:opacity-100 group-hover/btn:scale-125"
        />
      </button>
    </div>
  </section>
</template>
