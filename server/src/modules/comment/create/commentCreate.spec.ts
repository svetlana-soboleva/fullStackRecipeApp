import { authContext } from '@tests/utils/context'
import { Comment } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import commentRouter from '..'

const { db, users, recipes } = await setupTest()
const { create } = commentRouter.createCaller(authContext({ db }, users[0]))

it('should create a comment on a recipe', async () => {
  const newComment = { recipeId: recipes[2].id, text: 'new comment' }
  await create(newComment)
  await expect(
    db.getRepository(Comment).findOneByOrFail(newComment)
  ).resolves.not.toThrow()
})

it('requires an existing recipe', async () => {
  await expect(create({ recipeId: 999, text: 'new comment' })).rejects.toThrow(
    /recipe/i
  )
})
