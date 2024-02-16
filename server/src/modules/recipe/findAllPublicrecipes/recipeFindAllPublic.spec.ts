import { nonAuthContext } from '@tests/utils/context'
import { Recipe, User, Category } from '@server/entities'
import {
  fakeRecipe,
  fakeUser,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return all public recipes', async () => {
  const db = await createTestDatabase()

  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser()])

  const [category] = await db
    .getRepository(Category)
    .save([fakeCategory(), fakeCategory()])

  const publicRecipe = fakeRecipe({
    userId: userOther.id,
    categoryId: category.id,
    visibility: 'public',
  })

  await db.getRepository(Recipe).save([
    fakeRecipe({
      userId: user.id,
      visibility: 'private',
      categoryId: category.id,
    }),
    publicRecipe,
  ])
  const { findPublicRecipes } = router.createCaller(nonAuthContext({ db }))
  const publicRecipes = await findPublicRecipes()

  expect(publicRecipes).toHaveLength(1)
})
