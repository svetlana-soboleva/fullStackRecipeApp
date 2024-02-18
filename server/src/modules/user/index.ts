import { router } from '@server/trpc'
import login from './login'
import createUser from './createUser'
import update from './update'

export default router({
  login,
  createUser,
  update,
})
