import { authContext } from '@tests/utils/context'
import { Recipe } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import recipeRouter from '..'

const { db, recipes } = await setupTest()
const recipeRepository = db.getRepository(Recipe)

it('should delete the recipe by provided id', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[2].id })
  const { removeRecipe } = recipeRouter.createCaller(
    authContext({ db }, { id: recipe.userId })
  )
  await expect(recipeRepository.count()).resolves.toBe(recipes.length)
  await removeRecipe({ id: recipe.id })
  await expect(recipeRepository.count()).resolves.toBe(recipes.length - 1)
})
