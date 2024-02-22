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
  @Column('text', { nullable: true })
  username: string | null

  @Unique(['email'])
  @Column('text')
  email: string

  @Column('text', { select: false })
  password: string

  @OneToMany(() => Recipe, (recipe) => recipe.user, {
    cascade: ['insert'],
  })
  recipes: Recipe[]

  @Column('boolean', { default: false })
  admin: boolean
}

export type UserBare = Omit<User, 'recipes'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  username: z.string().trim().nullable(),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8).max(64),
  admin: z.boolean(),
})

export const userInsertSchema = userSchema.omit({ id: true }).extend({
  username: userSchema.shape.username.default(null),
  admin: userSchema.shape.admin.default(false),
})

export type UserInsert = z.infer<typeof userInsertSchema>

export type AuthUser = Pick<User, 'id' | 'admin'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
  admin: z.boolean(),
})

export const userUpdateSchema = userSchema.omit({ password: true })
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>
