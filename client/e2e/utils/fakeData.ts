import { Chance } from 'chance'

export const random = process.env.CI ? Chance(1) : Chance()

export const fakeUser = () => ({
  email: random.email(),
  password: 'password.123',
})


export const fakeRecipe = () => ({
  tittle: random.company(),
  category: 'soups',
  cooking_time: '50',
  servings: '9',
  video_link: random.url(),
  picture_link: random.url(),
  visibility: random.word(),
  description: random.string(),
})

export const fakeStep = () => ({
  name: random.word(),
  ingredients: random.string(),
  description: random.string(),
})

export const fakeUserProfile = () => ({
  name: random.name(),
  surname: random.name(),
  profile_picture: random.url(),
  about: random.string()
})

