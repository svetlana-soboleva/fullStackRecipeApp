import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import recipeRouter from '..'

it('should create a recipe', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = recipeRouter.createCaller(authContext({ db }, user))

  const recipeCreated = await create({
    title: 'My recipe',
    description: 'Easy to make',
    instructions: 'Do like so',
    ingredients: 'Butter 100g, milk 100g',
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
    description: 'Easy to make',
    instructions: 'Do like so',
    ingredients: 'Butter 100g, milk 100g',
    cooking_time: 15,
    servings: 3,
    video_link: 'http://',
    picture_link: 'http://',
    created_at: null,
    updated_at: null,
    visibility: 'public',
  })
})
