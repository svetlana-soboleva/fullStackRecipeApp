import { User, userSchema } from '@server/entities/user'
import { publicProcedure } from '@server/trpc'
import config from '@server/config'
import bcrypt from 'bcrypt'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .input(
    userSchema.pick({
      email: true,
      password: true,
      username: true,
    })
  )
  .mutation(async ({ input: { email, password, username }, ctx: { db } }) => {
    const hash = await bcrypt.hash(password, config.auth.passwordCost)

    try {
      const user = await db.getRepository(User).save({
        email,
        username,
        password: hash,
      })

      return {
        id: user.id,
        username: user.username,
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }
      if (error.message.includes('duplicate key')) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User with this email or username already exists',
        })
      }
      throw error
    }
  })
