import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { z } from 'zod'
import { Recipe } from './recipe'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Unique(['username'])
  @Column('text')
  username: string

  @Unique(['email'])
  @Column('text')
  email: string

  @Column('text', { select: false })
  password: string

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: ['insert'],
  })
  recipes: Recipe[]

  // maybe add role
}

export type UserBare = Omit<User, 'recipes'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  username: z.string().trim().toLowerCase(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(64),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserInsert = z.infer<typeof userInsertSchema>

export type AuthUser = Pick<User, 'id'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
})
