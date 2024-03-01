import { UserProfile } from '@server/entities'
import { userProfileInsertSchema } from '@server/entities/userProfile'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .input(userProfileInsertSchema.omit({ userId: true }))
  .mutation(async ({ input: userInfo, ctx: { authUser, db } }) => {
    const profile = {
      ...userInfo,
      userId: authUser.id,
    }
    const profileCreated = await db.getRepository(UserProfile).save(profile)
    return profileCreated
  })
