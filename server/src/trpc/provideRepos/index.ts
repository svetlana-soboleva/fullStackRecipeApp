import * as entities from '@server/entities'
import type { Repository } from 'typeorm'
import { middleware } from '..'

type Entities = typeof entities
type Repositories = {
  [K in keyof Entities]: Repository<InstanceType<Entities[K]>>
}

export default function provideRepos<TKeys extends keyof Entities>(
  entitiesWanted: Pick<Entities, TKeys>
) {
  return middleware(({ ctx, next }) => {
    const keys = Object.keys(entitiesWanted) as TKeys[]
    if (hasAllRepositories(ctx, keys)) {
      return next({
        ctx: {
          repos: ctx.repos,
        },
      })
    }
    const repos = Object.fromEntries(
      Object.entries(entitiesWanted).map(([key, EntityClass]) => [
        key,
        ctx.db.getRepository(EntityClass as any),
      ])
    ) as Pick<Repositories, TKeys>
    return next({
      ctx: {
        repos,
      },
    })
  })
}

function hasAllRepositories<TKeys extends keyof Entities>(
  ctx: any,
  keys: TKeys[]
): ctx is { repos: Pick<Repositories, TKeys> } {
  return keys.every((key) => ctx.repos && key in ctx.repos)
}
