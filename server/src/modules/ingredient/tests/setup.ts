import { createTestDatabase } from '@tests/utils/database'
import {
  fakeUser,
  fakeRecipe,
  fakeStep,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { Category, Recipe, Step, User } from '@server/entities'

export default async function setupTest() {
  const db = await createTestDatabase()
  const users = await db.getRepository(User).save([fakeUser(), fakeUser()])

  const categories = await db
    .getRepository(Category)
    .save([fakeCategory(), fakeCategory()])

  const recipe1 = await db
    .getRepository(Recipe)
    .save(fakeRecipe({ userId: users[0].id, categoryId: categories[0].id }))

  const step1 = await db
    .getRepository(Step)
    .save(fakeStep({ recipeId: recipe1.id }))

  return {
    db,
    user: users[0],
    category: categories[0],
    recipe1,
    step1,
  }
}
