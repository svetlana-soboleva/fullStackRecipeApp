import { router } from '@server/trpc'
import create from './create'
import find from './find'

export default router({
  create,
  find,
})
