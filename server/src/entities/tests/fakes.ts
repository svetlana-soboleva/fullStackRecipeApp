import type { User } from '@server/entities/user'
import type { Recipe } from '@server/entities/recipe'
import type { Category } from '@server/entities/category'
import type { Step } from '@server/entities/step'
import type { Ingredient } from '@server/entities/ingredient'
import type { UserProfile } from '@server/entities/userProfile'
import { random } from '@tests/utils/random'

const randomNumber = () => random.integer({ min: 1, max: 100000 })

export const fakeUser = <T extends Partial<User>>(overrides: T = {} as T) => ({
  id: randomNumber(),
  email: random.email(),
  password: 'Password.123!',
  username: random.word(),
  admin: true,
  ...overrides,
})

export const fakeRecipe = <T extends Partial<Recipe>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  title: random.string(),
  description: random.string(),
  instructions: random.string(),
  ingredients: random.string(),
  cooking_time: randomNumber(),
  servings: randomNumber(),
  video_link: random.string(),
  picture_link: random.string(),
  created_at: null,
  updated_at: null,
  visibility: 'public',
  ...overrides,
})

export const fakeCategory = <T extends Partial<Category>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  name: random.string(),
  ...overrides,
})

export const fakeStep = <T extends Partial<Step>>(overrides: T = {} as T) => ({
  id: randomNumber(),
  description: random.string(),
  ...overrides,
})

export const fakeIngredient = <T extends Partial<Ingredient>>(
  overrides: T = {} as T
) => ({
  id: randomNumber(),
  name: random.string(),
  amount: random.floating(),
  unit: random.string(),
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
