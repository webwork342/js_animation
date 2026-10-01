import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/IndexView.vue'
import Animation from '../views/AnimationView.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/animation/:id',
    name: 'Animation',
    component: Animation,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router