import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { User } from '@server/entities'
import { fakeUser } from '@server/entities/tests/fakes'
import { UserUpdateSchema } from '@server/entities/user'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const user = await userRepository.save(fakeUser())
const { update } = userRouter.createCaller(authContext({ db }, user))

it('should update a user', async () => {
  const { password, ...updates } = {
    ...user,
    username: 'new name',
  } as UserUpdateSchema

  const response = await update(updates)
  expect(response).toEqual(updates)

  const usersAll = await userRepository.find()
  expect(usersAll).toContainEqual(updates)
})
