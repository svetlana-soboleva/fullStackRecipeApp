import { authContext } from '@tests/utils/context'
import { Recipe } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import categoryRouter from '..'

const { db, recipes } = await setupTest()
const recipeRepository = db.getRepository(Recipe)

it('removes the recipe', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[1].id })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: recipe.userId, admin: false })
  )
  await expect(recipeRepository.count()).resolves.toBe(recipes.length)
  await remove({ id: recipe.id })
  await expect(recipeRepository.count()).resolves.toBe(recipes.length - 1)
})
