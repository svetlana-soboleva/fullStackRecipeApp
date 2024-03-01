import { Recipe, type RecipeBare } from '@server/entities/recipe'
import { publicProcedure } from '@server/trpc'

export default publicProcedure.query(async ({ ctx: { db } }) => {
  const recipes = (await db.getRepository(Recipe).find({
    where: { visibility: 'Public' },
    order: { id: 'ASC' },
  })) as RecipeBare[]

  return recipes
})
