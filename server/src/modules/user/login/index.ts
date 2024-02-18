import bcrypt from 'bcrypt'
import config from '@server/config'
import { userSchema } from '@server/entities/user'
import { User } from '@server/entities'
import jsonwebtoken from 'jsonwebtoken'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { prepareTokenPayload } from '../tokenPayload'

const { expiresIn, tokenKey } = config.auth

export default publicProcedure
  .input(
    userSchema.pick({
      email: true,
      password: true,
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { db } }) => {
    const user = (await db.getRepository(User).findOne({
      select: {
        id: true,
        password: true,
      },
      where: {
        email,
      },
    })) as Pick<User, 'id' | 'password' | 'admin'> | undefined

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Account with this email does not exist',
      })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Incorrect password. Try again.',
      })
    }

    const payload = prepareTokenPayload(user)

    const accessToken = jsonwebtoken.sign(payload, tokenKey, {
      expiresIn,
    })
    return {
      accessToken,
    }
  })
