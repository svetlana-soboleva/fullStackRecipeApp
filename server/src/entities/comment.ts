import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'
import { Recipe } from './recipe'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  text: string

  @Column('timestamp with time zone', { nullable: true })
  created_at: Date | null

  @Column('timestamp with time zone', { nullable: true })
  updated_at: Date | null

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User

  @ManyToOne(() => Recipe, (recipe) => recipe.comments)
  @JoinColumn()
  recipe: Recipe
}

export type CommentBare = Omit<Comment, 'user' | 'recipe'>

export const commentSchema = validates<CommentBare>().with({
  id: z.number().int().positive(),
  text: z.string(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
})

export const commentInsertSchema = commentSchema.omit({ id: true })
export type CommentInsert = z.infer<typeof commentInsertSchema>
