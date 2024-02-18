import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { validates } from '@server/utils/validation'
import { z } from 'zod'
import { Step } from './step'

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @Column('float')
  amount: number

  @Column('text')
  unit: string

  @Column('integer')
  stepId: number

  @ManyToOne(() => Step, (step) => step.ingredients)
  step: Step
}

export type IngredientBare = Omit<Ingredient, 'step'>
export const ingredientSchema = validates<IngredientBare>().with({
  id: z.number().int().positive(),
  name: z.string().trim(),
  amount: z.number(),
  unit: z.string().min(1).max(64),
  stepId: z.number().positive(),
})

export const ingredientInsertSchema = ingredientSchema.omit({ id: true })
export type IngredientInsert = z.infer<typeof ingredientInsertSchema>
