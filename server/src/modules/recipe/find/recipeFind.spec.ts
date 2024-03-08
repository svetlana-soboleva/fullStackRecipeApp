import { authContext } from '@tests/utils/context'
import { Recipe, User, Category } from '@server/entities'
import {
  fakeRecipe,
  fakeUser,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a list of recipies of the user', async () => {
  const db = await createTestDatabase()

  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  const [category, categoryOther] = await db
    .getRepository(Category)
    .save([fakeCategory(), fakeCategory()])

  await db
    .getRepository(Recipe)
    .save([
      fakeRecipe({ userId: user.id, categoryId: category.id }),
      fakeRecipe({ userId: userOther.id, categoryId: categoryOther.id }),
    ])

  const { find } = router.createCaller(authContext({ db }, user))
  const userRecipes = await find()
  expect(userRecipes).toHaveLength(1)
})
