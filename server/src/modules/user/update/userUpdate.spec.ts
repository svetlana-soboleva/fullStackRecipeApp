import { createTestDatabase } from '@tests/utils/database'
import { authContext } from '@tests/utils/context'
import { User } from '@server/entities'
import { fakeUser } from '@server/entities/tests/fakes'
import { UserUpdateSchema } from '@server/entities/user'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const user = await userRepository.save(fakeUser())
const wrongUser = await userRepository.save(fakeUser())
const { update } = userRouter.createCaller(authContext({ db }, user))

it('should update a user', async () => {
  // @ts-ignore
  const { password, ...updates } = {
    ...user,
    username: 'new name',
  } as UserUpdateSchema

  const response = await update(updates)
  expect(response).toEqual(updates)

  const usersAll = await userRepository.find()
  expect(usersAll).toContainEqual(updates)
})

it('should throw an error updating wrong user', async () => {
  await expect(
    update({
      ...wrongUser,
      username: 'new name',
    })
  ).rejects.toThrow(/user/i)
})
