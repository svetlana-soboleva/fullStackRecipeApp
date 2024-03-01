import { authContext } from '@tests/utils/context'
import setupTest from '@server/entities/tests/setup'
import { router } from '..'
import { recipeIdOwnerProcedure } from '.'

const routes = router({
  testCall: recipeIdOwnerProcedure.query(() => 'passed'),
})

const { db, users, recipes } = await setupTest()

const userOne = users[0]
const recipeOfTheUser = recipes[0]
const notUsersRecipe = recipes[1]

const authenticated = routes.createCaller(authContext({ db }, userOne))

it('should pass if project belongs to the user', async () => {
  const response = await authenticated.testCall({
    recipeId: recipeOfTheUser.id,
  })

  expect(response).toEqual('passed')
})

it('should throw an error if recipeId is not provided', async () => {
  await expect((authenticated.testCall as any)({})).rejects.toThrow(/recipe/i)
})

it('should throw an error if user provides a non-existing recipeId', async () => {
  await expect(
    (authenticated.testCall as any)({ recipeId: 999 })
  ).rejects.toThrow(/recipe/i)
})

it('should throw an error if user provides null recipeId', async () => {
  await expect(
    authenticated.testCall({ recipeId: null as any })
  ).rejects.toThrow(/recipe/i)
})

it('should throw an error if recipe does not belong to the user', async () => {
  await expect(
    authenticated.testCall({ recipeId: notUsersRecipe.id })
  ).rejects.toThrow(/recipe/i)
})
