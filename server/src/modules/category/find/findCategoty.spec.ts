import setupTest from '@server/entities/tests/setup'
import categoryRouter from '..'

const { db, categories } = await setupTest()
const { find } = categoryRouter.createCaller({ db })
it('should return a name if the category by provided id', async () => {
  const category = await find({ id: categories[0].id })
  expect(category).toEqual(categories[0].name)
})

it('require an existing id', async () => {
  await expect(find({ id: 999 })).rejects.toThrow(/id/i)
})
