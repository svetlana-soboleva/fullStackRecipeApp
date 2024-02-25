import { router } from '../trpc'
import recipe from './recipe'
import user from './user'
import category from './category'
import step from './step'

export const appRouter = router({
  category,
  recipe,
  user,
  step
})

export type AppRouter = typeof appRouter
