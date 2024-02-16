import { router } from '../trpc'
import recipe from './recipe'
import user from './user'
import category from './category'

export const appRouter = router({
  recipe,
  user,
  category,
})

export type AppRouter = typeof appRouter
