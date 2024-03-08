import { createTestDatabase } from '@tests/utils/database'
import {
  fakeUser,
  fakeRecipe,
  fakeCategory,
  fakeUserProfile,
} from '@server/entities/tests/fakes'
import { Category, Recipe, User, UserProfile } from '@server/entities'

export default async function setupTest() {
  const db = await createTestDatabase()
  const users = await db
    .getRepository(User)
    .save([fakeUser(), fakeUser(), fakeUser(), fakeUser()])

  const categories = await db
    .getRepository(Category)
    .save([fakeCategory(), fakeCategory(), fakeCategory(), fakeCategory()])

  const recipes = await db
    .getRepository(Recipe)
    .save([
      fakeRecipe({ userId: users[0].id, categoryId: categories[0].id }),
      fakeRecipe({ userId: users[1].id, categoryId: categories[1].id }),
      fakeRecipe({ userId: users[0].id, categoryId: categories[1].id }),
    ])

  const userProfiles = await db
    .getRepository(UserProfile)
    .save([
      fakeUserProfile({ userId: users[0].id }),
      fakeUserProfile({ userId: users[1].id }),
      fakeUserProfile({ userId: users[2].id }),
    ])

  return {
    db,
    users,
    categories,
    recipes,
    userProfiles,
  }
}
