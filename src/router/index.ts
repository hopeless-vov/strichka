import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/SearchView.vue'),
  },
  {
    path: '/watch',
    name: 'watch',
    meta: { hideNav: true },
    component: () => import('@/views/WatchView.vue'),
  },
  {
    path: '/browse/:id',
    name: 'browse',
    component: () => import('@/views/BrowseView.vue'),
  },
  {
    path: '/my-list',
    name: 'list',
    component: () => import('@/views/MyListView.vue'),
  },
  {
    path: '/genre/:key',
    name: 'genre',
    component: () => import('@/views/GenreView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
