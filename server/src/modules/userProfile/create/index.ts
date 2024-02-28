import { UserProfile } from '@server/entities'
import { userProfileInsertSchema } from '@server/entities/userProfile'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .input(userProfileInsertSchema.omit({ userId: true }))
  .mutation(async ({ input: userInfo, ctx: { authUser, db } }) => {
    // here I check if the user profile already exists
    const existingProfile = await db
      .getRepository(UserProfile)
      .findOneBy({ userId: authUser.id })
    if (existingProfile) {
      await db
        .getRepository(UserProfile)
        .update({ userId: authUser.id }, userInfo)
      return existingProfile
    }
    const profile = {
      ...userInfo,
      userId: authUser.id,
    }
    const profileCreated = await db.getRepository(UserProfile).save(profile)
    return profileCreated
  })
