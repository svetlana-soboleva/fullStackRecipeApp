import { Recipe, recipeSchema, type RecipeBare } from '@server/entities/recipe'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(recipeSchema.shape.categoryId)
  .query(async ({ input: categoryId, ctx: { db } }) => {
    const recipies = (await db.getRepository(Recipe).find({
      where: { categoryId, visibility: 'Public' },
    })) as RecipeBare[]
    return recipies
  })
