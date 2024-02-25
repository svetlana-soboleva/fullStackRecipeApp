import { Recipe, recipeInsertSchema } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

// We want to allow only authenticated users to create projects.
// That's why we are using authenticatedProcedure instead of publicProcedure.
// authenticatedProcedure is a middlware that checks if there is an authentication token
// provided in the request. If there is, it will set the authenticated user in the context.
// Then we can access the authenticated user in the ctx.authUser property below.
// If you would import publicProcedure and use it instead of authenticatedProcedure,
// then the procedure resolver (main function) would throw a TypeScript error that
// authUser could be undefined.
export default authenticatedProcedure

  // omitting the userId, we will set it to the authenticated user id
  .input(recipeInsertSchema.omit({ userId: true }))

  // Then, we would use a new property 'repos' instead of db.
  .mutation(async ({ input: recipeData, ctx: { authUser, db } }) => {
    const project = {
      ...recipeData,
      userId: authUser.id,
      created_at: new Date()
    }

    const recipeCreated = await db.getRepository(Recipe).save(project)

    return recipeCreated
  })
