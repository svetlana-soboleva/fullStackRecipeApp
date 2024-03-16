import { router } from '@server/trpc'
import create from './create'
import find from './find'
import update from './update'
import get from './get'
import remove from './remove'

export default router({
  create,
  find,
  update,
  get,
  remove
})
