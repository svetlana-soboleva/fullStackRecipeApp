import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'
import { Category } from './category'
import { Step } from './step'

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  tittle: string

  @Column('text')
  categoryId: number

  @ManyToOne(() => Category, (category) => category.recipe)
  @JoinColumn()
  category: Category

  @Column({ type: 'text' })
  cooking_time: string

  @Column({ type: 'text' })
  servings: string

  @Column('text')
  video_link: string

  @Column('text')
  picture_link: string

  @Column('timestamp with time zone')
  created_at: Date | null

  @Column({ type: 'enum', enum: ['Public', 'Private'], default: 'Public' })
  visibility: string

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @OneToMany(() => Step, (step) => step.recipe, { onDelete: 'CASCADE' })
  steps: Step[]
}

export type RecipeBare = Omit<Recipe, 'user' | 'category' | 'steps'>

export const recipeSchema = validates<RecipeBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  tittle: z
    .string()
    .trim()
    .min(2, 'Recipe title must be at least 2 characters long')
    .max(100),
  categoryId: z.number(),
  cooking_time: z.string(),
  servings: z.string(),
  video_link: z.string(),
  picture_link: z.string(),
  created_at: z.date().nullable(),
  visibility: z.string(),
})

export const recipeInsertSchema = recipeSchema.omit({
  id: true,
  created_at: true,
})
export type RecipeInsert = z.infer<typeof recipeInsertSchema>
