import { nonAuthContext } from '@tests/utils/context'
import { Recipe, User } from '@server/entities'
import { fakeRecipe, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return all public recipes', async () => {
  const db = await createTestDatabase()

  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  await db
    .getRepository(Recipe)
    .save([
      fakeRecipe({ userId: user.id, visibility: 'private' }),
      fakeRecipe({ userId: userOther.id, visibility: 'public' }),
    ])
  const { findPublicRecipes } = router.createCaller(nonAuthContext({ db }))
  const publicRecipies = await findPublicRecipes()
  expect(publicRecipies).toHaveLength(1)
})
