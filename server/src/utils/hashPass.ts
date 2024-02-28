import bcrypt from 'bcrypt'
import config from '@server/config'

export async function hashPass(password: string) {
  return bcrypt.hash(password, config.auth.passwordCost)
}