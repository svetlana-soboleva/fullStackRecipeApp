import { publicProcedure } from '@server/trpc'
import { Category } from '@server/entities/category'

export default publicProcedure.query(async ({ ctx: { db } }) =>
  db.getRepository(Category).find()
)
