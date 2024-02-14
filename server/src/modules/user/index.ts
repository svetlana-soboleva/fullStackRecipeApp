import { router } from '@server/trpc'
import login from './login'
import createUser from './createUser'

export default router({
  login,
  createUser,
})
