import setupTest from '@server/entities/tests/setup'
import { authContext } from '@tests/utils/context'
import { fakeRecipe, fakeStep } from '@server/entities/tests/fakes'
import { Recipe, Step } from '@server/entities'
import stepRouter from '..'

const { db, categories, users } = await setupTest()
const { find } = stepRouter.createCaller(authContext({ db }, users[0]))

it('should return a list of steps for a specific recipe', async () => {
  const recipe = await db
    .getRepository(Recipe)
    .save(fakeRecipe({ userId: users[0].id, categoryId: categories[0].id }))
  const [step1, step2] = await db
    .getRepository(Step)
    .save([
      fakeStep({ recipeId: recipe.id }),
      fakeStep({ recipeId: recipe.id }),
    ])

  const stepsFound = await stepRouter
    .createCaller(authContext({ db }, users[0]))
    .find({ recipeId: recipe.id })
  expect(stepsFound).toEqual([step1, step2])
})

it('require an existing id', async () => {
  // @ts-ignore
  await expect(find({ id: 999 })).rejects.toThrow(/id/i)
})
