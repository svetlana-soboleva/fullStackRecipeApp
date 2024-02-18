import { router } from '@server/trpc'
import create from './create'
import find from './findAllUsersrecipes'
import get from './get'
import getPublicRecipe from './getPublicRecipe'
import findPublicRecipes from './findAllPublicrecipes'

export default router({
  create,
  find,
  get,
  getPublicRecipe,
  findPublicRecipes,
})
