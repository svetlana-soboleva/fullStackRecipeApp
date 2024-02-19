import { authContext } from '@tests/utils/context'
import setupTest from '@server/entities/tests/setup'
import stepRouter from '..'


it('should return a list of steps of given recipe', async () => {
  const { db, recipes, users } = await setupTest()

  const { find } = stepRouter.createCaller(authContext({ db }, users[0]))

  const stepsFound = await find({
    recipeId: recipes[0].id,
  })
  expect(stepsFound).toMatchObject([
    {
      recipeId: recipes[0].id,
    },
  ])
})
