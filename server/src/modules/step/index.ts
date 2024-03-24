import { router } from '@server/trpc'
import create from './create'
import find from './find'
import update from './update'
import findForUpdating from './findForUpdating'
import remove from './remove'

export default router({
  create,
  find,
  update,
  findForUpdating,
  remove
})
