import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'recipe/create',
          name: 'RecipeCreate',
          component: () => import('../views/RecipeCreateView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '',
      component: HomeLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
