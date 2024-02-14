import { Recipe, recipeInsertSchema } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .input(recipeInsertSchema)
  .mutation(async ({ input: recipeData, ctx: { authUser, db } }) => {
    const recipe = {
      ...recipeData,
      userId: authUser.id,
    }
    const recipeCreated = await db.getRepository(Recipe).save(recipe)
    return recipeCreated
  })
