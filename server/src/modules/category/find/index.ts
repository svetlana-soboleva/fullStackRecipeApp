import { Category, categorySchema } from '@server/entities/category'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(
    categorySchema.pick({
      name: true,
    })
  )
  .mutation(async ({ input: { name }, ctx: { db } }) => {
    const pickedCategory = await db.getRepository(Category).findOne({
      select: {
        id: true,
      },
      where: {
        name,
      },
    })
    if (!pickedCategory) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'The category is not found',
      })
    }
    return pickedCategory
  })
