import { test, expect } from '@playwright/test';
import { loginNewUser } from 'utils/api'
import { fakeRecipe, fakeStep } from 'utils/fakeData'

const recipe = fakeRecipe()
const step = fakeStep()

test.describe.serial('recipesequence', () => {

  test('create recipe', async ({ page }) => {
    await loginNewUser(page)
    await page.goto('/dashboard')
    const addRecipeBtn = page.getByTestId('createRecipe')
    await expect(addRecipeBtn).toBeVisible()

    const recipeList = page.getByTestId('recipeList')
    await expect(recipeList).toBeHidden()
    addRecipeBtn.click();
    await page
      .getByRole('tabpanel', { name: 'Category' })
      .getByLabel('Category')
      .selectOption('Desserts')
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByTestId('tittle').click();
    await page.getByTestId('tittle').fill(recipe.tittle);
    await page.getByTestId('description').click();
    await page.getByTestId('description').fill(recipe.description);
    await page.getByTestId('cooking_time').click();
    await page.getByTestId('cooking_time').fill(recipe.cooking_time);
    await page.getByTestId('servings').click();
    await page.getByTestId('servings').fill(recipe.servings);
    await page.getByTestId('pictureLink').click();
    await page.getByTestId('pictureLink').fill(recipe.picture_link);
    await page.getByTestId('videoLink').click();
    await page.getByTestId('videoLink').fill(recipe.video_link);
    await page.locator('label').filter({ hasText: 'Public' }).locator('span').nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByPlaceholder('Step name').click();
    await page.getByPlaceholder('Step name').fill(step.name);
    await page.getByLabel('Ingredients:').click();
    await page.getByLabel('Ingredients:').fill(step.ingredients);
    await page.getByLabel('Description:').click();
    await page.getByLabel('Description:').fill(step.description);
    await page.getByRole('button', { name: 'Save' }).click();


    await expect(page.getByRole('link', { name: recipe.tittle })).toBeVisible()
    await expect(page.getByText(recipe.description)).toBeVisible()
  });


  test('recipe has properties', async ({ page }) => {
    await loginNewUser(page)
    await page.goto('/dashboard')
    const addRecipeBtn = page.getByTestId('createRecipe')
    addRecipeBtn.click();
    await page
      .getByRole('tabpanel', { name: 'Category' })
      .getByLabel('Category')
      .selectOption('Desserts')
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByTestId('tittle').click();
    await page.getByTestId('tittle').fill(recipe.tittle);
    await page.getByTestId('description').click();
    await page.getByTestId('description').fill(recipe.description);
    await page.getByTestId('cooking_time').click();
    await page.getByTestId('cooking_time').fill(recipe.cooking_time);
    await page.getByTestId('servings').click();
    await page.getByTestId('servings').fill(recipe.servings);
    await page.getByTestId('pictureLink').click();
    await page.getByTestId('pictureLink').fill(recipe.picture_link);
    await page.getByTestId('videoLink').click();
    await page.getByTestId('videoLink').fill(recipe.video_link);
    await page.locator('label').filter({ hasText: 'Public' }).locator('span').nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByPlaceholder('Step name').click();
    await page.getByPlaceholder('Step name').fill(step.name);
    await page.getByLabel('Ingredients:').click();
    await page.getByLabel('Ingredients:').fill(step.ingredients);
    await page.getByLabel('Description:').click();
    await page.getByLabel('Description:').fill(step.description);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByTestId('recipeCardTest').first().click();

    await expect(page.getByRole('heading', { name: 'Desserts'})).toBeVisible()
    await expect(page.getByTestId('stepTest')).toHaveText(`${step.name}:`)

  })

  test('delete recipe', async ({ page }) => {
    await loginNewUser(page)
    await page.goto('/dashboard')
    const addRecipeBtn = page.getByTestId('createRecipe')
    addRecipeBtn.click();
    await page
      .getByRole('tabpanel', { name: 'Category' })
      .getByLabel('Category')
      .selectOption('Desserts')
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByTestId('tittle').click();
    await page.getByTestId('tittle').fill(recipe.tittle);
    await page.getByTestId('description').click();
    await page.getByTestId('description').fill(recipe.description);
    await page.getByTestId('cooking_time').click();
    await page.getByTestId('cooking_time').fill(recipe.cooking_time);
    await page.getByTestId('servings').click();
    await page.getByTestId('servings').fill(recipe.servings);
    await page.getByTestId('pictureLink').click();
    await page.getByTestId('pictureLink').fill(recipe.picture_link);
    await page.getByTestId('videoLink').click();
    await page.getByTestId('videoLink').fill(recipe.video_link);
    await page.locator('label').filter({ hasText: 'Public' }).locator('span').nth(1).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByPlaceholder('Step name').click();
    await page.getByPlaceholder('Step name').fill(step.name);
    await page.getByLabel('Ingredients:').click();
    await page.getByLabel('Ingredients:').fill(step.ingredients);
    await page.getByLabel('Description:').click();
    await page.getByLabel('Description:').fill(step.description);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByTestId('recipeCardTest').first().click();

    await page.getByTestId('deleteBtn').click();
    await expect(page.getByText(recipe.tittle)).toBeHidden()
  })
})
