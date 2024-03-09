import { test, expect } from '@playwright/test'
import { loginNewUser } from './utils/api'
import { random, fakeUser } from './utils/fakeData'

const fakeRecipe = () => ({
  tittle: random.company(),
  category: random.word(),
  cooking_time: '50',
  servings: '9',
  video_link: random.url(),
  picture_link: random.url(),
  visibility: random.word(),
  description: random.string(),
})

const fakeStep = () => ({
  name: random.word(),
  ingredients: random.string(),
  description: random.string(),
})

test.describe.serial('see a recipe', () => {
  const recipe = fakeRecipe()
  const step = fakeStep()
  const user = fakeUser()

  test('user can create a recipe', async ({ page }) => {
    await loginNewUser(page, user)
    await page.goto('/dashboard')

    const recipeList = page.getByTestId('recipeList')
    await expect(recipeList).toBeHidden()

    // click on a button to create a new recipe
    await page.getByTestId('createRecipe').click()

    await page
      .getByRole('tabpanel', { name: 'Category' })
      .getByLabel('Category')
      .selectOption('Desserts')
    await page.getByRole('button', { name: 'Next' }).click()
    await page.getByPlaceholder('Give a name to your recipe').click()
    await page.getByPlaceholder('Give a name to your recipe').fill(recipe.tittle)
    await page.getByPlaceholder('What makes this recipe spesial?').click()
    await page.getByPlaceholder('What makes this recipe spesial?').fill(recipe.description)
    await page.getByLabel('Cook Time (min):').click()
    await page.getByLabel('Cook Time (min):').fill(recipe.cooking_time)
    await page.getByLabel('Servings:').click()
    await page.getByLabel('Servings:').fill(recipe.servings)
    await page.getByLabel('Picture link:').click()
    await page.getByLabel('Picture link:').fill(recipe.picture_link)
    await page.getByLabel('Video link:').click()
    await page.getByLabel('Video link:').fill(recipe.video_link)
    await page.locator('label').filter({ hasText: 'Public' }).locator('span').nth(1).click()
    await page.getByRole('button', { name: 'Save' }).click()
    await page.getByPlaceholder('Step name').click()
    await page.getByPlaceholder('Step name').fill(step.name)
    await page.getByLabel('Ingredients:').click()
    await page.getByLabel('Ingredients:').fill(step.ingredients)
    await page.getByLabel('Description:').click()
    await page.getByLabel('Description:').fill(step.description)

    await page.getByRole('button', { name: 'Save' }).click()
    await expect(recipeList).toContainText(recipe.tittle)
  })
})
