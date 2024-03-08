import type { User } from '@server/entities/user'
import type { Recipe } from '@server/entities/recipe'
import type { Category } from '@server/entities/category'
import type { UserProfile } from '@server/entities/userProfile'
import type { Step } from '@server/entities/step'

import { random } from '@tests/utils/random'

const randomNumber = () => random.integer({ min: 1, max: 2147483647 })

export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomNumber(),
  email: random.email(),
  password: 'Password.123!',
  ...overrides,
})

export const fakeRecipe = <T extends Partial<Recipe>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  tittle: random.string(),
  cooking_time: random.string(),
  servings: random.string(),
  video_link: random.string(),
  picture_link: random.string(),
  created_at: random.date(),
  visibility: 'Public',
  description: random.string(),
  ...overrides,
})

export const fakeCategory = <T extends Partial<Category>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  name: random.string(),
  ...overrides,
})

export const fakeUserProfile = <T extends Partial<UserProfile>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  name: random.word(),
  surname: random.word(),
  profile_picture: random.string(),
  about: random.string(),
  ...overrides,
})

export const fakeStep = <T extends Partial<Step>>(overrides: T = {} as T) => ({
  id: randomNumber(),
  name: random.word(),
  ingredients: random.string(),
  description: random.string(),
  ...overrides,
})

