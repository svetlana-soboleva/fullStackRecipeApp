import jsonwebtoken from 'jsonwebtoken'
import config from '@server/config'
import { buildAuthenticatedProcedure } from './buildAuthenticatedProcedure'

const { tokenKey } = config.auth

const verifyToken = (token: string) => jsonwebtoken.verify(token, tokenKey)

export const authenticatedProcedure = buildAuthenticatedProcedure(verifyToken)
