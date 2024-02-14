import { validates } from '@server/utils/validation'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { RecipeIngredient } from './recipeIngredient'

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @OneToMany(() => RecipeIngredient, (ingredient) => ingredient.unit, {
    cascade: ['insert'],
  })
  ingredients: RecipeIngredient[]
}

export type UnitBare = Omit<Unit, 'ingredients'>
export const unitSchema = validates<UnitBare>().with({
  id: z.number().int().positive(),
  name: z.string(),
})

export const unitInsertSchema = unitSchema.omit({ id: true })
export type UnitInsert = z.infer<typeof unitInsertSchema>
