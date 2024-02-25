import { authContext } from '@tests/utils/context'
import { Recipe } from '@server/entities'
import setupTest from '@server/entities/tests/setup'
import { TRPCError } from '@trpc/server'
import recipeRouter from '..'

const { db, recipes } = await setupTest()
const recipeRepository = db.getRepository(Recipe)

it('should return the recipe if found', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[1].id })
  const { get } = recipeRouter.createCaller(
    authContext({ db }, { id: recipe.userId})
  )
  const result = await get(recipe.id)

  expect(result).toMatchObject(recipe)
})

it('should throw an error if the user has no access', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[1].id })
  const { get } = recipeRouter.createCaller(
    authContext({ db }, { id: 999 })
  )
  const error = await get(recipe.id).catch((err) => err)
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('FORBIDDEN')
  expect(error.message).toBe('You are not allowed to access this recipe')
})

it('should throw an error if the recipe is not found', async () => {
  const recipe = await recipeRepository.findOneByOrFail({ id: recipes[1].id })
  const { get } = recipeRouter.createCaller(
    authContext({ db }, { id: recipe.userId })
  )
  const error = await get(101010).catch((err) => err)
  expect(error).toBeInstanceOf(TRPCError)
  expect(error.code).toBe('NOT_FOUND')
  expect(error.message).toBe('Recipe was not found')
})