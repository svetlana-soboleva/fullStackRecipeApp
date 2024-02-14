import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

@Entity()
export class IngredientName {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string
}

export const ingredientNameSchema = validates<IngredientName>().with({
  id: z.number().int().positive(),
  name: z.string(),
})
export const IngredientNameSchema = ingredientNameSchema.omit({ id: true })
export type IngredientNameInsert = z.infer<typeof ingredientNameSchema>
