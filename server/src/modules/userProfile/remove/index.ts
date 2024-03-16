import {
    userProfileSchema,
    UserProfile,
    type UserProfileBare,
  } from '@server/entities/userProfile'
  import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
  import { TRPCError } from '@trpc/server'
  
  export default authenticatedProcedure
    .input(userProfileSchema.shape.id)
    .mutation(async ({ input: userProfileId, ctx: { authUser, db } }) => {
        const userProfileRepository = db.getRepository(UserProfile)
      const userProfile = (await userProfileRepository
        .findOne({ where: { id: userProfileId } })) as UserProfileBare
  
      if (userProfile.userId !== authUser.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to access this profile',
        })
      }
   
      return userProfileRepository.delete(userProfileId)
    })
  