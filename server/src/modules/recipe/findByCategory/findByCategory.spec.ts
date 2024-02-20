import setupTest from '@server/entities/tests/setup'
import { User, Category, Recipe } from '@server/entities'
import { fakeCategory, fakeRecipe } from '@server/entities/tests/fakes'
import categoryRouter from '..'

const { users, db } = await setupTest()
const savedUsers = await db.getRepository(User).save(users)
const categories = await db
  .getRepository(Category)
  .save([
    fakeCategory({ name: 'Category1' }),
    fakeCategory({ name: 'Category2' }),
  ])

const publicRecipe = fakeRecipe({
  userId: savedUsers[0].id,
  categoryId: categories[0].id,
  visibility: 'public',
})
const privateRecipe = fakeRecipe({
  userId: savedUsers[0].id,
  categoryId: categories[0].id,
  visibility: 'private',
})

it('should return public recipes of a given category', async () => {
  await db.getRepository(Recipe).save([publicRecipe, privateRecipe])
  const { findByCategory } = categoryRouter.createCaller({ db })
  const recipesFound = await findByCategory({
    categoryId: categories[0].id,
  })
  expect(recipesFound).toHaveLength(1)
})
