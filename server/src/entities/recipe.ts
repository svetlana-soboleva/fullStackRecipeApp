import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'
import { Category } from './category'
import { Comment } from './comment'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  userId: number

  @Column('text')
  title: string

  @ManyToOne(() => Category, (category) => category.recipe)
  @JoinColumn()
  category: Category

  @Column('text')
  description: string

  @Column('text')
  instructions: string

  @Column('text')
  ingredients: string

  @Column({ type: 'int' })
  cooking_time: number

  @Column({ type: 'int' })
  servings: number

  @ManyToOne(() => User)
  user: User

  @Column('text', { nullable: true })
  video_link: string

  @Column('text', { nullable: true })
  picture_link: string

  @Column('timestamp with time zone', { nullable: true })
  created_at: Date | null

  @Column('timestamp with time zone', { nullable: true })
  updated_at: Date | null

  @OneToMany(() => Comment, (comment) => comment.recipe, {
    cascade: ['insert'],
  })
  comments: Comment[]

  @Column({ type: 'enum', enum: ['public', 'private'], default: 'public' })
  visibility: string
}

export type RecipeBare = Omit<Recipe, 'user' | 'comments' | 'category'>

export const recipeSchema = validates<RecipeBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  title: z
    .string()
    .trim()
    .min(2, 'Recipe title must be at least 2 characters long')
    .max(100),
  description: z.string(),
  instructions: z.string(),
  ingredients: z.string(),
  cooking_time: z.number().int().positive(),
  servings: z.number().int().positive(),
  video_link: z.string(),
  picture_link: z.string(),
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  visibility: z.string(),
})

export const recipeInsertSchema = recipeSchema.omit({ id: true })
export type RecipeInsert = z.infer<typeof recipeInsertSchema>
