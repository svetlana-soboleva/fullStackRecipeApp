import { Category } from '@server/entities'
import { categoryInserSchema } from '@server/entities/category'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .input(categoryInserSchema)
  .mutation(async ({ input: newCategory, ctx: { db } }) => {
    const existingCategory = await db.getRepository(Category).findOne({
      where: { name: newCategory.name },
    })
    if (existingCategory) {
      return { id: existingCategory.id }
    }

    const savedCategory = await db.getRepository(Category).save(newCategory)
    return { id: savedCategory.id}
  })
