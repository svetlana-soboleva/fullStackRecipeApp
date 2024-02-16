import { nonAuthContext } from '@tests/utils/context'
import { Recipe, User } from '@server/entities'
import { fakeRecipe, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { TRPCError } from '@trpc/server'
import router from '..'

it('should return a public recipe by id', async () => {
  const db = await createTestDatabase()

  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  const [privateRecipe, publicRecipe] = await db
    .getRepository(Recipe)
    .save([
      fakeRecipe({ userId: user.id, visibility: 'private' }),
      fakeRecipe({ userId: userOther.id, visibility: 'public' }),
    ])
  const { getPublicRecipe } = router.createCaller(nonAuthContext({ db }))

  const result = await getPublicRecipe(publicRecipe.id)
  let error: any
  try {
    await getPublicRecipe(privateRecipe.id)
  } catch (err) {
    error = err
  }

  expect(result).toHaveProperty('id', publicRecipe.id)
  
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('NOT_FOUND')
  expect(error.message).toBe('Recipe was not found')
})
