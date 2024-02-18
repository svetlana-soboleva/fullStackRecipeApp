import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { z } from 'zod'
import { Recipe } from './recipe'
import { Ingredient } from './ingredient'

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  description: string

  @Column('integer')
  recipeId: number

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  recipe: Recipe

  @OneToMany(() => Ingredient, (ingredient) => ingredient.step, {
    cascade: true,
  })
  ingredients: Ingredient[]
}

export type StepBare = Omit<Step, 'ingredients' | 'recipe'>
export const stepSchema = validates<StepBare>().with({
  id: z.number().int().positive(),
  description: z.string().min(5),
  recipeId: z.number().positive(),
})

export const stepInsertSchema = stepSchema.omit({ id: true })
export type StepInsert = z.infer<typeof stepInsertSchema>
