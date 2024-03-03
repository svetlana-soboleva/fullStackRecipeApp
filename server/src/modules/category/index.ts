import { router } from '@server/trpc'
import create from './create'
import find from './find'
import list from './list'

export default router({
  create,
  find,
  list,
})
