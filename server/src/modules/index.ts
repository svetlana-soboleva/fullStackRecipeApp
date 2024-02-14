import { router } from '../trpc'
import comment from './comment'
import recipe from './recipe'
import user from './user'

export const appRouter = router({
  comment,
  recipe,
  user,
})

export type AppRouter = typeof appRouter
