import { useBreakpoints } from '@vueuse/core'
import { computed, nextTick, type Ref,ref } from 'vue'

interface CarouselItem {
  id: number | string
}

export function useCarousel<T extends CarouselItem>(items: T[]) {
  const bp = useBreakpoints({ sm: 640, md: 768, lg: 1024, xl: 1280 })

  const cardsPerPage = computed(() => {
    if (bp.smaller('sm').value) return 3
    if (bp.smaller('md').value) return 4
    if (bp.smaller('lg').value) return 5
    if (bp.smaller('xl').value) return 6
    return 7
  })

  const cardWidthPercent = computed(() => 100 / cardsPerPage.value)

  const list: Ref<T[]> = ref([...items]) as Ref<T[]>

  const isNavigating = ref(false)
  const hasTransition = ref(false)
  const direction = ref<'next' | 'prev' | null>(null)

  const defaultOffset = computed(() => -(100 / cardsPerPage.value))
  const animationOffset = ref(0)
  const translateX = computed(() => defaultOffset.value + animationOffset.value)

  function rotateForward() {
    for (let i = 0; i < cardsPerPage.value; i++) {
      list.value.push(list.value.shift()!)
    }
  }

  function rotateBackward() {
    for (let i = 0; i < cardsPerPage.value; i++) {
      list.value.unshift(list.value.pop()!)
    }
  }

  function next() {
    if (isNavigating.value) return
    isNavigating.value = true
    direction.value = 'next'
    hasTransition.value = true
    animationOffset.value = -100
  }

  async function prev() {
    if (isNavigating.value) return
    isNavigating.value = true
    direction.value = 'prev'

    rotateBackward()

    await nextTick()
    animationOffset.value = -100

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        hasTransition.value = true
        animationOffset.value = 0
      })
    })
  }

  function onTransitionEnd() {
    hasTransition.value = false

    if (direction.value === 'next') {
      rotateForward()
      animationOffset.value = 0
    }

    direction.value = null
    isNavigating.value = false
  }

  return {
    list,
    cardsPerPage,
    cardWidthPercent,
    translateX,
    hasTransition,
    isNavigating,
    next,
    prev,
    onTransitionEnd,
  }
}
