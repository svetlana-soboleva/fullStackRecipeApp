import {
    userProfileSchema,
    UserProfile,
    type UserProfileBare,
  } from '@server/entities/userProfile'
  import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
  import { TRPCError } from '@trpc/server'
  
  export default authenticatedProcedure
    .input(userProfileSchema.shape.id)
    .query(async ({ input: userProfileId, ctx: { authUser, db } }) => {
      const userProfile = (await db
        .getRepository(UserProfile)
        .findOne({ where: { id: userProfileId } })) as UserProfileBare
  
      if (!userProfile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile was not found',
        })
      }
      if (userProfile.userId !== authUser.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to access this profile',
        })
      }
      return userProfile
    })
  