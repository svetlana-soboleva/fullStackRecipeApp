import type { User } from '@server/entities/user'
import type { Recipe } from '@server/entities/recipe'

import { random } from '@tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomId(),
  email: random.email(),
  password: 'Password.123!',
  username: random.name(),
  ...overrides,
})

export const fakeRecipe = <T extends Partial<Recipe>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  title: random.string(),
  description: random.string(),
  instructions: random.string(),
  ingredients: random.string(),
  cooking_time: random.integer(),
  servings: random.integer(),
  video_link: random.string(),
  picture_link: random.string(),
  created_at: null,
  updated_at: null,
  visibility: 'public',
  ...overrides,
})
