import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'
import { z } from 'zod'
import { User, Recipe } from '.'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  text: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user: User

  @Column('integer')
  recipeId: number

  @ManyToOne(() => Recipe, (recipe) => recipe.comments, {
    onDelete: 'CASCADE',
  })
  recipe: Recipe
}

export type CommentBare = Omit<Comment, 'user' | 'recipe'>

export const commentSchema = validates<CommentBare>().with({
  id: z.number().int().positive(),
  text: z.string().min(1).max(300),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.number().int().positive(),
  recipeId: z.number().int().positive(),
})

export const commentInsertSchema = commentSchema.pick({
  text: true,
  recipeId: true,
})

export const commentUpdateSchema = commentSchema.pick({
  id: true,
  text: true,
})