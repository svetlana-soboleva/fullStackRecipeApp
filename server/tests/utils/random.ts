import { Chance } from 'chance'
import config from '@server/config'

export const random = config.isCi ? Chance(1) : Chance()
