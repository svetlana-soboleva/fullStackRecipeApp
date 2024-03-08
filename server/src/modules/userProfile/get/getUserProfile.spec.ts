import { authContext } from '@tests/utils/context'
import { UserProfile } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import { TRPCError } from '@trpc/server'
import userProfileRouter from '..'

const { db, userProfiles } = await setupTest()
const userProfileRepository = db.getRepository(UserProfile)

it('should return the user profile if found', async () => {
  const userProfile = await userProfileRepository.findOneByOrFail({
    id: userProfiles[1].id,
  })
  const { get } = userProfileRouter.createCaller(
    authContext({ db }, { id: userProfile.userId })
  )
  const result = await get(userProfile.id)

  expect(result).toMatchObject(userProfile)
})

it('should throw an error if the user has no access', async () => {
  const userProfile = await userProfileRepository.findOneByOrFail({
    id: userProfiles[1].id,
  })
  const { get } = userProfileRouter.createCaller(
    authContext({ db }, { id: 999 })
  )
  const error = await get(userProfile.id).catch((err) => err)
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('FORBIDDEN')
  expect(error.message).toBe('You are not allowed to access this profile')
})

it('should throw an error if the recipe is not found', async () => {
  const userProfile = await userProfileRepository.findOneByOrFail({
    id: userProfiles[1].id,
  })
  const { get } = userProfileRouter.createCaller(
    authContext({ db }, { id: userProfile.userId })
  )
  const error = await get(101010).catch((err) => err)
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('NOT_FOUND')
  expect(error.message).toBe('Profile was not found')
})
