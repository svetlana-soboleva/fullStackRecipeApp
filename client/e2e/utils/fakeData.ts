import { Chance } from 'chance'

export const random = process.env.CI ? Chance(1) : Chance()

export const fakeUser = () => ({
  email: random.email(),
  password: 'password.123',
})
