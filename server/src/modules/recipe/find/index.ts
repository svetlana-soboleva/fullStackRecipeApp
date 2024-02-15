import { Recipe, type RecipeBare } from '@server/entities/recipe'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id

    const recipes = (await db.getRepository(Recipe).find({
      where: { userId },
      order: { id: 'ASC' },
    })) as RecipeBare[]
    return recipes
  }
)
