import { authContext } from '@tests/utils/context'
import stepRouter from '..'
import setupStepTest from '../tests/setup'

it('should return a list of steps of given recipe', async () => {
  const { db, recipe1, user } = await setupStepTest()

  const { find } = stepRouter.createCaller(authContext({ db }, user))

  const stepsFound = await find({
    recipeId: recipe1.id,
  })
  expect(stepsFound).toMatchObject([
    {
      recipeId: recipe1.id,
    },
  ])
})
