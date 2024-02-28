import { Comment, commentInsertSchema } from '@server/entities/comment'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'


export default authenticatedProcedure
  .input(commentInsertSchema)
  .mutation(async ({ input: commentData, ctx: { authUser, db } }) =>
    db.getRepository(Comment).save({ userId: authUser.id, ...commentData })
  )
