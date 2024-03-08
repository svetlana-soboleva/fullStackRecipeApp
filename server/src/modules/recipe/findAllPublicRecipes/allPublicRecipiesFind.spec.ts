import setupTest from '@server/entities/tests/setup'
import recipeRouter from '..'

const { db } = await setupTest()
const { findAllPublicRecipes } = recipeRouter.createCaller({ db })

it('returns a list of all ads', async () => {
  const response = await findAllPublicRecipes()
  expect(response).toHaveLength(3)
})
