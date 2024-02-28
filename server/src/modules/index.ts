import { router } from '../trpc'
import recipe from './recipe'
import user from './user'
import category from './category'
import step from './step'
import userProfile from './userProfile'

export const appRouter = router({
  category,
  recipe,
  user,
  step,
  userProfile,
})

export type AppRouter = typeof appRouter
