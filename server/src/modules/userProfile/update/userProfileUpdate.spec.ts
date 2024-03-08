import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import userProfileRouter from '..'

const db = await createTestDatabase()
const user = await db.getRepository(User).save(fakeUser())

it('it should update user profile', async () => {
  const { create, update } = userProfileRouter.createCaller(
    authContext({ db }, user)
  )
  const userProfileCreated = await create({
    name: 'Lana',
    surname: 'Kim',
    profile_picture: 'http...',
    about: 'any',
  })
  const updates = { name: 'Ebba', surname: 'Lund' }
  const response = await update({ ...userProfileCreated, ...updates })

  expect(response).toMatchObject({ name: 'Ebba' })
})
