import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { z } from 'zod'
import { User } from './user'

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  userId: number

  @OneToOne(() => User)
  user: User

  @Column('text', { nullable: true })
  name: string | null

  @Column('text', { nullable: true })
  surname: string | null

  @Column('text', { nullable: true })
  profile_picture: string | null

  @Column('text', { nullable: true })
  about: string | null
}

export type UserProfileBare = Omit<UserProfile, 'user'>

export const userProfileSchema = validates<UserProfileBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  name: z.string().min(2).nullable(),
  surname: z.string().min(2).nullable(),
  profile_picture: z.string().nullable(),
  about: z.string().nullable(),
})

export const userProfileInsertSchema = userProfileSchema.omit({ id: true })
export type UserProfileInsert = z.infer<typeof userProfileInsertSchema>
