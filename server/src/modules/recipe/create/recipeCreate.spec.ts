import { authContext } from '@tests/utils/context'
import { fakeCategory, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, User } from '@server/entities'
import recipeRouter from '..'

it('should create a recipe', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = recipeRouter.createCaller(authContext({ db }, user))

  const category = await db.getRepository(Category).save(fakeCategory())

  const recipeCreated = await create({
    title: 'My recipe',
    categoryId: category.id,
    description: 'Easy to make',
    cooking_time: 15,
    servings: 3,
    video_link: 'http://',
    picture_link: 'http://',
    created_at: null,
    updated_at: null,
    visibility: 'public',
  })

  expect(recipeCreated).toMatchObject({
    id: expect.any(Number),
    userId: user.id,
    title: 'My recipe',
    categoryId: category.id,
    description: 'Easy to make',
    cooking_time: 15,
    servings: 3,
    video_link: 'http://',
    picture_link: 'http://',
    created_at: null,
    updated_at: null,
    visibility: 'public',
  })
})
