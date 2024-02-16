import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { z } from 'zod'
import { Recipe } from '.'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  name: string

  @OneToMany(() => Recipe, (recipe) => recipe.category, {
    cascade: ['insert'],
  })
  recipe: Recipe[]
}

export type CategoryBare = Omit<Category, 'recipe'>
export const categorySchema = validates<CategoryBare>().with({
  id: z.number().int().positive(),
  name: z.string().min(3).toLowerCase().trim(),
})

export const categoryInserSchema = categorySchema.omit({ id: true })
export type CategoryInsert = z.infer<typeof categoryInserSchema>
