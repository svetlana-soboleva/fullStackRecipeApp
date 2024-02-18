import { fakeRecipe, fakeStep } from '@server/entities/tests/fakes'
import { Recipe } from '@server/entities'
import { authContext } from '@tests/utils/context'
import stepRouter from '..'
import setupStepTest from '../tests/setup'

it('should save and return a step', async () => {
  const { db, user, category } = await setupStepTest()
  const { create } = stepRouter.createCaller(authContext({ db }, user))

  const recipe = await db
    .getRepository(Recipe)
    .save(fakeRecipe({ categoryId: category.id, userId: user.id }))

  const step = fakeStep({ recipeId: recipe.id })
  const stepCreated = await create(step)
  expect(stepCreated).toMatchObject({
    ...step,
    id: expect.any(Number),
  })
  expect(stepCreated.id).not.toEqual(step.id)
})
