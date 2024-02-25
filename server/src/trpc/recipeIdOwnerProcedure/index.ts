import { TRPCError } from '@trpc/server'
import z from 'zod'
import { Recipe } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '../provideRepos'

export const recipeIdOwnerProcedure = authenticatedProcedure
  .use(provideRepos({ Recipe }))
  .input(
    z.object({
      recipeId: z.number(),
    })
  )
  .use(async ({ input: { recipeId }, ctx: { authUser, repos }, next }) => {
    const recipe = await repos.Recipe.findOne({
      select: {
        userId: true,
      },
      where: {
        id: recipeId,
      },
    })

    if (!recipe) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Recipe not found',
      })
    }

    if (recipe.userId !== authUser.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Recipe does not belong to the user',
      })
    }

    return next()
  })
