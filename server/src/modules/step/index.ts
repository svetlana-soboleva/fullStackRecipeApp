import { router } from '@server/trpc'
import create from './create'
import find from './find'
import update from './update'
import findForUpdating from './findForUpdating'

export default router({
  create,
  find,
  update,
  findForUpdating
})
