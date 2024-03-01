import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import { authenticate } from './guards'
import HomeLayout from '@/layouts/HomeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: [authenticate],
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: '',
          name: 'AllRecipes',
          component: () => import('../views/AllPublicRecipesView.vue'),
        },
        {
          path: 'userProfile/create',
          name: 'userProfileCreate',
          component: () => import('../views/userProfile/UserProfileCreateView.vue'),
        },

        {
          path: 'userProfile/:id/update',
          name: 'userProfileUpdate',
          component: () => import('../views/userProfile/UserProfileUpdateView.vue'),
        },
        {
          path: 'recipe/create',
          name: 'RecipeCreate',
          component: () => import('../views/RecipeCreateView.vue'),
        },
        {
          path: 'recipe/:id/step/create',
          name: 'StepCreate',
          component: () => import('../views/StepCreateView.vue'),
        },
        {
          path: 'recipe/:id',
          name: 'Recipe',
          component: () => import('../views/RecipeView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/auth/SignupView.vue'),
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
