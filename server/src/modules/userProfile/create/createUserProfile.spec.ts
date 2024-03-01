import { authContext } from '@tests/utils/context'
import { UserProfile } from '@server/entities/userProfile'
import { fakeUserProfile } from '@server/entities/tests/fakes'
import setupTest from '@server/entities/tests/setup'
import userProfileRouter from '..'

const { db, users } = await setupTest()
const userProfileRepository = db.getRepository(UserProfile)
const { create } = userProfileRouter.createCaller(authContext({ db }, users[0]))

it('should create a profile', async () => {
  const userProfile = await create(fakeUserProfile({ userId: users[0].id }))
  const profileCreated = await userProfileRepository.findOneOrFail({
    where: { userId: users[0].id },
  })
  expect(profileCreated).toMatchObject(userProfile)
})
