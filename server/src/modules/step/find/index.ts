import { type StepBare, Step, stepSchema } from '@server/entities/step'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(
    stepSchema.pick({
      recipeId: true,
    })
  )
  .query(async ({ input: { recipeId }, ctx: { db } }) => {
    const steps = (await db.getRepository(Step).find({
      where: {
        recipeId,
      },
      order: { id: 'ASC' },
    })) as StepBare[]

    return steps
  })
