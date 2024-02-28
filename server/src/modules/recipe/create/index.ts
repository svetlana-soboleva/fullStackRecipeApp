import { Recipe, recipeInsertSchema } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure

  .input(recipeInsertSchema.omit({ userId: true }))
  .mutation(async ({ input: recipeData, ctx: { authUser, db } }) => {
    const project = {
      ...recipeData,
      userId: authUser.id,
      createdAt: new Date(),
    }

    const recipeCreated = await db.getRepository(Recipe).save(project)

    return recipeCreated
  })
