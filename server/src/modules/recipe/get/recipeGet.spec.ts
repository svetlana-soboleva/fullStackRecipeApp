import { Recipe } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import recipeRouter from '..'

const { db, recipes } = await setupTest()
const recipeRepository = db.getRepository(Recipe)

it('should return the recipe if found', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[1].id })
  const { get } = recipeRouter.createCaller({ db })
  const result = await get(recipe.id)

  expect(result).toMatchObject(recipe)
})

it('require an existing id', async () => {
  const { get } = recipeRouter.createCaller({ db })
  await expect(get(101010)).rejects.toThrow(/id/i)
})
