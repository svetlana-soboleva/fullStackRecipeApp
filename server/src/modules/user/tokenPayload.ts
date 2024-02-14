import type { AuthUser } from '@server/entities/user'
import z from 'zod'

const tokenPayloadSchema = z.object({
    user: z.object({
        id: z.number()
    })
})

type TokenPayload = z.infer<typeof tokenPayloadSchema>

export function prepareTokenPayload(user: AuthUser): TokenPayload {
    return tokenPayloadSchema.parse({ user})
}

export function parseTokenPayload(tokenVerified: unknown): TokenPayload {
    return tokenPayloadSchema.parse(tokenVerified)
  }