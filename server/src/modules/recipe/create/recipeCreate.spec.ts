import { authContext } from '@tests/utils/context'
import { fakeUser, fakeCategory } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User, Category } from '@server/entities'
import projectRouter from '..'

it('should create a persisted project', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = projectRouter.createCaller(authContext({ db }, user))

  const category = await db.getRepository(Category).save(fakeCategory())

  const recipeCreated = await create({
    tittle: 'My recipe',
    categoryId: category.id,
    cooking_time: '15',
    servings: '3',
    video_link: 'http://',
    picture_link: 'http://',
    visibility: 'Public',
  })

  expect(recipeCreated).toMatchObject({
    id: expect.any(Number),
    userId: user.id,
    tittle: 'My recipe',
    categoryId: category.id,
    cooking_time: '15',
    servings: '3',
    video_link: 'http://',
    picture_link: 'http://',
    created_at: expect.any(Date),
    visibility: 'Public',
  })
})
