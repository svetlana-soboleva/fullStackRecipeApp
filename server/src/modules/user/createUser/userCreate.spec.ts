import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import { fakeUser } from '@server/entities/tests/fakes'
import userRouter from '..'

const db = await createTestDatabase()
const userRepository = db.getRepository(User)
const { createUser } = userRouter.createCaller({ db })

it('should save a user', async () => {
  const user = fakeUser()
  const response = await createUser(user)
  const userCreated = await userRepository.findOneOrFail({
    select: {
      id: true,
      email: true,
      password: true,
      username: true,
      admin: true,
    },
    where: {
      email: user.email,
    },
  })

  expect(userCreated).toMatchObject({
    id: expect.any(Number),
    email: user.email,
    password: expect.not.stringContaining(user.password),
    username: user.username,
    admin: user.admin,
  })

  expect(userCreated.password).toHaveLength(60)

  expect(response).toEqual({
    id: expect.any(Number),
    email: user.email,
  })

  expect(response.id).toEqual(userCreated!.id)
})

it('should require a valid email', async () => {
  await expect(
    createUser({
      email: 'user-email-invalid',
      password: 'password.123',
      username: 'carrot',
      admin: true,
    })
  ).rejects.toThrow(/email/i)
})

it('should require a unique email', async () => {
  await createUser({
    email: 'duplicate@email.com',
    username: 'User',
    password: 'password.123',
    admin: false,
  })
  await expect(
    createUser({
      email: 'duplicate@email.com',
      username: 'User2',
      password: 'password.123',
      admin: false,
    })
  ).rejects.toThrow(/email/i)
})

it('should require a password with at least 8 characters', async () => {
  await expect(
    createUser({
      email: 'user2@domain.com',
      username: 'User',
      password: 'p.123',
      admin: true,
    })
  ).rejects.toThrow(/password/i)
})

it('stores lowercased email', async () => {
  const user = fakeUser()
  await createUser({
    ...user,
    email: user.email.toUpperCase(),
  })

  await expect(
    userRepository.findOneByOrFail({
      email: user.email.toLowerCase(),
    })
  ).resolves.not.toBeNull()
})

it('stores email with trimmed whitespace', async () => {
  const user = fakeUser()
  await createUser({
    ...user,
    email: ` \t ${user.email}\t `,
  })

  await expect(
    userRepository.findOneByOrFail({
      email: user.email,
    })
  ).resolves.not.toBeNull()
})
