import { Recipe } from '@server/entities'
import { recipeSchema } from '@server/entities/recipe'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(
    recipeSchema.pick({
      categoryId: true,
    })
  )
  .query(async ({ input: { categoryId }, ctx: { db } }) => {
    const recipes = await db.getRepository(Recipe).find({
      where: {
        categoryId,
        visibility: 'public',
      },
      relations: ['steps'],
    })

    return recipes
  })
