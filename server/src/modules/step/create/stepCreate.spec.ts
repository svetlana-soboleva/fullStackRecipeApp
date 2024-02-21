import { fakeRecipe, fakeStep } from '@server/entities/tests/fakes'
import { Recipe } from '@server/entities'
import { authContext } from '@tests/utils/context'
import setupTest from '@server/entities/tests/setup'
import stepRouter from '..'

it('should save and return a step', async () => {
  const { db, users, categories } = await setupTest()
  const { create } = stepRouter.createCaller(authContext({ db }, users[0]))

  const recipe = await db
    .getRepository(Recipe)
    .save(fakeRecipe({ categoryId: categories[0].id, userId: users[0].id }))

  const step = fakeStep({ recipeId: recipe.id })
  const stepCreated = await create(step)
  expect(stepCreated).toMatchObject({
    ...step,
    id: expect.any(Number),
  })
  expect(stepCreated.id).not.toEqual(step.id)
})

it('requires an existing recipe', async () => {
  const { db, users } = await setupTest()
  const { create } = stepRouter.createCaller(authContext({ db }, users[0]))

  const step = fakeStep({ recipeId: 9999 })
  expect(create(step)).rejects.toThrow(/recipe/i)
})
