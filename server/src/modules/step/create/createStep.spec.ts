import { authContext } from '@tests/utils/context'
import setupTest from '@server/entities/tests/setup'
import { fakeStep } from '@server/entities/tests/fakes'
import { TRPCError } from '@trpc/server'
import stepRouter from '..'

const { db, recipes, users } = await setupTest()
const { create } = stepRouter.createCaller(authContext({ db }, users[0]))
it('should save and return a bug', async () => {
  const step = fakeStep({ recipeId: recipes[0].id })
  const stepCreated = await create(step)

  expect(stepCreated).toMatchObject({
    ...step,
    id: expect.any(Number),
  })

  expect(stepCreated.id).not.toEqual(step.id)
})

it('require an existing recipe', async () => {
  const step = fakeStep({ recipeId: 9999 })
  const error = await create(step).catch((err) => err)
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('NOT_FOUND')
  expect(error.message).toBe('Recipe not found')
})
