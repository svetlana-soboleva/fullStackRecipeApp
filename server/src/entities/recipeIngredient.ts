import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { z } from 'zod'
import { IngredientName } from './ingredientName'
import { Recipe, Unit } from '.'

@Entity()
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => IngredientName, { eager: true })
  @JoinColumn()
  ingredientName: IngredientName

  @Column('numeric')
  amount: number

  @ManyToOne(() => Unit, (unit) => unit.ingredients)
  @JoinColumn()
  unit: Unit

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn()
  recipe: Recipe
}

export type IngredientBare = Omit<
  RecipeIngredient,
  'recipe' | 'unit' | 'ingredientName'
>
export const ingredientSchema = validates<IngredientBare>().with({
  id: z.number().int().positive(),
  amount: z.number(),
})

export const ingredientInserSchema = ingredientSchema.omit({ id: true })
export type IngredientInsert = z.infer<typeof ingredientInserSchema>
