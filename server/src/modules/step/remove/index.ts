import { Step, stepSchema } from '@server/entities/step'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'


export default authenticatedProcedure
  .input(stepSchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: {  db } }) => {
    const stepRepository = db.getRepository(Step)
   
    return stepRepository.delete(id)
  })
