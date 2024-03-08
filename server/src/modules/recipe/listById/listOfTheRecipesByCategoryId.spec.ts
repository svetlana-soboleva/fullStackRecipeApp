import setupTest from '@server/entities/tests/setup'
import { Recipe, Category } from '@server/entities'
import { fakeRecipe, fakeCategory } from '@server/entities/tests/fakes'
import recipeRouter from '..'

const { db, users } = await setupTest()
const { listById } = recipeRouter.createCaller({ db })

it('returns a list of all all public recipes by category', async () => {
  const [breakfast, lunch] = await db
    .getRepository(Category)
    .save([
      fakeCategory({ name: 'breakfast' }),
      fakeCategory({ name: 'lunch' }),
    ])
  const [publiRecipe, privateRecipe] = await db.getRepository(Recipe).save([
    fakeRecipe({
      userId: users[0].id,
      categoryId: breakfast.id,
      visibility: 'Public',
    }),
    fakeRecipe({
      userId: users[0].id,
      categoryId: lunch.id,
      visibility: 'Private',
    }),
  ])
  const publicBreakfastRecipe = await listById(breakfast.id)
  
  expect(publicBreakfastRecipe).toHaveLength(1)
  expect(publiRecipe).toHaveProperty('categoryId')
  expect(privateRecipe).toHaveProperty('visibility', 'Private')
})
