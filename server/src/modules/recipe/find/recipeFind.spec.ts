import { authContext } from '@tests/utils/context'
import { Recipe, User } from '@server/entities'
import { fakeRecipe, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a list o recipies of the user', async () => {
  const db = await createTestDatabase()

  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  await db
    .getRepository(Recipe)
    .save([
      fakeRecipe({ userId: user.id }),
      fakeRecipe({ userId: userOther.id }),
    ])


  const { find } = router.createCaller(authContext({ db }, user))
  const userRecipes = await find()
  expect(userRecipes).toHaveLength(1)
})
