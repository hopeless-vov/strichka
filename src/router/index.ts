import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/shows',
    name: 'shows',
    component: () => import('@/views/ShowsView.vue'),
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('@/views/MoviesView.vue'),
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('@/views/NewView.vue'),
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
    path: '/browse',
    name: 'browse',
    component: () => import('@/views/BrowseView.vue'),
  },
  {
    path: '/my-list',
    name: 'list',
    component: () => import('@/views/MyListView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
