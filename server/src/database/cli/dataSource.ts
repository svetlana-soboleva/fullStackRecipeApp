import config from '@server/config'
import { createDatabase } from '..'

export const migrationDatasource = createDatabase(config.database as any)
