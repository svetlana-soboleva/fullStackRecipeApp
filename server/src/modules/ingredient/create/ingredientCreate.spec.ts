import { authContext } from '@tests/utils/context'
import { fakeIngredient } from '@server/entities/tests/fakes'
import ingredientRouter from '..'
import setupTest from '../tests/setup'

it('should save and return ingredient information', async () => {
  const { db, step1, user } = await setupTest()
  const { create } = ingredientRouter.createCaller(authContext({ db }, user))

  const ingredient = fakeIngredient({ stepId: step1.id })
  const ingredientCreated = await create(ingredient)
  expect(ingredientCreated).toMatchObject({
    ...ingredient,
    id: expect.any(Number),
  })
  expect(ingredientCreated.id).not.toEqual(ingredient.id)
})
