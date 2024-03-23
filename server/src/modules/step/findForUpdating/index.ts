import { recipeIdOwnerProcedure } from '@server/trpc/recipeIdOwnerProcedure'
import { type StepBare, Step, stepSchema } from '@server/entities/step'

export default recipeIdOwnerProcedure
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
      order: { id: 'DESC' },
    })) as StepBare[]

    return steps
  })