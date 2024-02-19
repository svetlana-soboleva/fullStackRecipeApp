import { router } from '../trpc'
import recipe from './recipe'
import user from './user'
import userProfile from './userProfile'
import category from './category'
import ingredient from './ingredient'
import step from './step'

export const appRouter = router({
  recipe,
  user,
  userProfile,
  category,
  ingredient,
  step,
})

export type AppRouter = typeof appRouter
