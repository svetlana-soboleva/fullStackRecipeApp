import { Recipe, recipeSchema } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(recipeSchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: { authUser, db } }) => {
    const recipeRepository = db.getRepository(Recipe)
    const recipe = await recipeRepository.findOneByOrFail({ id })

    if (recipe.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to delete this recipe',
      })
    }
    return recipeRepository.delete(id)
  })
