import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  userId: number

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
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
export type UserProfileUpdate = Omit<UserProfileBare, 'userId' | 'id'>

export const userProfileSchema = validates<UserProfileBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  name: z.string().trim().nullable(),
  surname: z.string().trim().nullable(),
  profile_picture: z.string().nullable(),
  about: z.string().nullable(),
})

export const userProfileInsertSchema = userProfileSchema.omit({ id: true })


export type UserProfileInsert = z.infer<typeof userProfileInsertSchema>
