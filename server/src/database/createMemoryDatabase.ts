import { newDb } from 'pg-mem'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as entities from '../entities'

export default function createMemoryDatabase(): DataSource {
    const pgMemory = newDb()
  
    pgMemory.public.registerFunction({
      name: 'current_database',
      implementation: () => 'test',
    })
    pgMemory.public.registerFunction({
      name: 'version',
      implementation: () => '1',
    })
  
    return pgMemory.adapters.createTypeormDataSource({
      type: 'postgres',
      entities,
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    })
  }