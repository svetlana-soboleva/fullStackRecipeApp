import { Recipe, recipeSchema, type RecipeBare } from '@server/entities/recipe'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(recipeSchema.shape.id)
  .query(async ({ input: recipeId, ctx: { db } }) => {
    const recipe = (await db.getRepository(Recipe).findOneOrFail({
      where: { id: recipeId },
    })) as RecipeBare

    if (!recipe) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Recipe was not found',
      })
    }
    return recipe
  })

