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
import { Step } from './step'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number

  @Column('integer')
  userId: number

  @Column('text')
  title: string

  @Column('text')
  categoryId: number

  @ManyToOne(() => Category, (category) => category.recipe)
  @JoinColumn()
  category: Category

  @Column('text')
  description: string

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

  @Column({ type: 'enum', enum: ['public', 'private'], default: 'public' })
  visibility: string

  @OneToMany(() => Step, (step) => step.recipe, { cascade: ['insert'] })
  steps: Step[]
}

export type RecipeBare = Omit<Recipe, 'user' | 'steps' | 'category'>

export const recipeSchema = validates<RecipeBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  title: z
    .string()
    .trim()
    .min(2, 'Recipe title must be at least 2 characters long')
    .max(100),
  categoryId: z.number(),
  description: z.string(),
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
