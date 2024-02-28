import { UserProfile, type UserProfileBare } from '@server/entities/userProfile'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const userId = authUser.id

    const userProfile = (await db
      .getRepository(UserProfile)
      .findOne({ where: { userId } })) as UserProfileBare
    return userProfile
  }
)
