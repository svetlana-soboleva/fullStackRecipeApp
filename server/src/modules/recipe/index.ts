import { router } from '@server/trpc'
import create from './create'
import find from './find'
import get from './get'
import findAllPublicRecipes from './findAllPublicRecipes'
import listById from './listById'

export default router({
  create,
  find,
  get,
  findAllPublicRecipes,
  listById,
})
