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

it('rejects user that does not own the recipe', async () => {
  const recipe2 = await recipeRepository.findOneByOrFail({ id: recipes[0].id })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: 999, admin: false })
  )
  await expect(remove({ id: recipe2.id })).rejects.toThrow('Admin only')
})

it('removes recipe as admin', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[0].id })
  const { remove } = categoryRouter.createCaller(
    authContext({ db }, { id: 999, admin: true })
  )
  await remove({ id: recipe.id })
  await expect(
    recipeRepository.findOneByOrFail({ id: recipes[0].id })
  ).rejects.toThrow()
})
