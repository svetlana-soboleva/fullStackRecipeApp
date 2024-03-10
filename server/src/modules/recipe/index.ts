import { router } from '@server/trpc'
import create from './create'
import find from './find'
import get from './get'
import findAllPublicRecipes from './findAllPublicRecipes'
import listById from './listById'
import reciveRecipe from './revome'

export default router({
  create,
  find,
  get,
  findAllPublicRecipes,
  listById,
  reciveRecipe,
})
