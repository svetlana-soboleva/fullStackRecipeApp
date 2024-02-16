import { createTestDatabase } from '@tests/utils/database'

import categoryRouter from '..'

const db = await createTestDatabase()

describe('create a categoty', () => {
  it('should create a category with new id if it is not exist in db', async () => {
    const { create } = categoryRouter.createCaller({ db })

    const category1 = await create({
      name: 'breakfast',
    })
    const category2 = await create({
      name: 'breakfast',
    })
    expect(category1).toHaveProperty('id')
    expect(category1).toMatchObject({
      id: expect.any(Number),
    })
    expect(category2).toMatchObject({
      id: category1.id,
    })
  })
})
