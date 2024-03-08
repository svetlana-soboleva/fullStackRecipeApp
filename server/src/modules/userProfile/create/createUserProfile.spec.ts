import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import userProfileRouter from '..'

const db = await createTestDatabase()
const user = await db.getRepository(User).save(fakeUser())
const { create } = userProfileRouter.createCaller(authContext({ db }, user))

it('should create a profile', async () => {
  
  const userProfileCreated = await create({
    name: 'Lana',
    surname: 'Kim',
    profile_picture:'http...',
    about: 'any'
  })

  expect(userProfileCreated).toMatchObject({
    id: expect.any(Number),
    userId: user.id,
    name: 'Lana',
    surname: 'Kim',
    profile_picture:'http...',
    about: 'any'
  })
})
