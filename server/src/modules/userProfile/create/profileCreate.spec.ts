import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { UserProfile } from '@server/entities/userProfile'
import { User } from '@server/entities/user'
import { fakeUserProfile, fakeUser } from '@server/entities/tests/fakes'
import userProfileRouter from '..'

it('should create a profile', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUser())
  const { create } = userProfileRouter.createCaller(authContext({ db }, user))

  const profile = await db
    .getRepository(UserProfile)
    .save(fakeUserProfile({ userId: user.id }))

  const profileCreated = await create(profile)
  expect(profileCreated).toHaveProperty('id')
})
