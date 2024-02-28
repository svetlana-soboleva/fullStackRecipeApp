import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { z } from 'zod'
import { User } from './user'
import { Category } from './category'
import { Step } from './step'
import { Comment } from './comment'

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

  @Column('text')
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: 'enum', enum: ['Public', 'Private'], default: 'Public' })
  visibility: string

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.recipes, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User

  @OneToMany(() => Step, (step) => step.recipe, { onDelete: 'CASCADE' })
  steps: Step[]

  @OneToMany(() => Comment, (comment) => comment.recipe)
  comments: Comment[]
}

export type RecipeBare = Omit<
  Recipe,
  'user' | 'category' | 'steps' | 'comments'
>

export const recipeSchema = validates<RecipeBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  tittle: z
    .string()
    .trim()
    .min(2, 'Recipe title must be at least 2 characters long')
    .max(100),
  description: z.string().min(5).max(200),
  categoryId: z.number(),
  cooking_time: z.string(),
  servings: z.string(),
  video_link: z.string(),
  picture_link: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  visibility: z.string(),
})

export const recipeInsertSchema = recipeSchema.omit({
  id: true,
 /*  createdAt: true, */
  updatedAt: true,
})
export type RecipeInsert = z.infer<typeof recipeInsertSchema>
