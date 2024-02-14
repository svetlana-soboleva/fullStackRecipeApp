import { DataSource, type DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '../entities'
import createMemoryDatabase from './createMemoryDatabase'

export function createDatabase(
  options: Partial<DataSourceOptions | { type: 'pg-mem' }> = {}
) {
  // Run with an in-memory database.
  if (options.type === 'pg-mem') {
    return createMemoryDatabase()
  }

  return new DataSource({
    entities,
    namingStrategy: new SnakeNamingStrategy(),
    ...options,
  } as any)
}

export type Database = DataSource
