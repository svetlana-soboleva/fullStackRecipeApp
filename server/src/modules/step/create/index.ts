import { Recipe } from '@server/entities'
import { Step, stepInsertSchema } from '@server/entities/step'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(stepInsertSchema)
  .mutation(async ({ input: step, ctx: { db } }) => {
    const recipe = await db.getRepository(Recipe).findOneBy({
      id: step.recipeId,
    })

    if (!recipe) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Recipe not found',
      })
    }

    const stepCreated = await db.getRepository(Step).save(step)

    return stepCreated
  })
