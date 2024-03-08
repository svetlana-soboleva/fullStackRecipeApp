import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import {
  UserProfile,
  userProfileInsertSchema,
} from '@server/entities/userProfile'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(userProfileInsertSchema)
  .mutation(async ({ input: userInfo, ctx: { authUser, db } }) => {
    const userProfileRepository = db.getRepository(UserProfile)
    const userProfile = await userProfileRepository.findOneByOrFail({
      userId: authUser.id,
    })

    if (userProfile.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'No access to edit this profile',
      })
    }

    userProfile.name = userInfo.name
    userProfile.surname = userInfo.surname
    userProfile.profile_picture = userInfo.profile_picture
    userProfile.about = userInfo.about
    
    const updatedUserProfile = await userProfileRepository.save(userProfile)

    return updatedUserProfile
  })
