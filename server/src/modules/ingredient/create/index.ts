import { Ingredient, Step } from '@server/entities'
import { ingredientInsertSchema } from '@server/entities/ingredient'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(ingredientInsertSchema)
  .mutation(async ({ input: ingredient, ctx: { db } }) => {
    const step = await db.getRepository(Step).findOneBy({
      id: ingredient.stepId,
    })
    if (!step) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Step not found',
      })
    }
    const ingredientCreated = await db
      .getRepository(Ingredient)
      .save(ingredient)
    return ingredientCreated
  })
