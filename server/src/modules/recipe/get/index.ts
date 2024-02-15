import { Recipe, recipeSchema, type RecipeBare } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(recipeSchema.shape.id)
  .query(async ({ input: recipeId, ctx: { authUser, db } }) => {
    const recipe = (await db.getRepository(Recipe).findOne({
      where: { id: recipeId },
    })) as RecipeBare

    if (!recipe) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Recipe was not found',
      })
    }
    if (recipe.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to access this recipe',
      })
    }
    return recipe
  })
