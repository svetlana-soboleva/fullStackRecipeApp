import { authContext } from '@tests/utils/context'
import { fakeUser, fakeUserProfile } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import userProfileRouter from '..'

const db = await createTestDatabase()
const user = await db.getRepository(User).save(fakeUser())
const { create, find } = userProfileRouter.createCaller(
  authContext({ db }, user)
)

it('should return information about the user by provided id', async () => {
  const userProfile = await create(fakeUserProfile({ userId: user.id }))

  const foundProfile = await find()

  expect(foundProfile).toMatchObject({
    userId: userProfile.userId,
  })
})
