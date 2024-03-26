import { test, expect } from '@playwright/test';
import { loginNewUser } from 'utils/api'
import { fakeUserProfile } from 'utils/fakeData'

const { name, surname } = fakeUserProfile()

test.describe.serial('user profile sequence', () => {
  test('create a user profile', async ( {page }) => {
    await loginNewUser(page)
    await page.goto('/dashboard')
    const linkToCareateUserProfile = page.getByTestId('createUserProfile')
    await expect(linkToCareateUserProfile).toBeVisible()
    linkToCareateUserProfile.click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByTestId('userProfileName').click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByTestId('userProfileName').fill(name);
    await page.locator('div').filter({ hasText: /^Surname$/ }).getByTestId('userProfileSurname').click();
    await page.locator('div').filter({ hasText: /^Surname$/ }).getByTestId('userProfileSurname').fill(surname);
    await page.getByTestId('saveBtnUserProfile').click();
    const userProfileCreated = page.getByTestId('userProfile')
    await expect(userProfileCreated).toBeVisible()
    const dropdownBtn = page.locator('#dropdownButton')
    await expect(dropdownBtn).toBeVisible()
    await expect(page.getByTestId('userProfileFullName')).toHaveText(`${name} ${surname}`)

  })

  test('update user profile', async ( { page }) => {
    await loginNewUser(page)
    await page.goto('/dashboard')
    const linkToCareateUserProfile = page.getByTestId('createUserProfile')
    linkToCareateUserProfile.click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByTestId('userProfileName').click();
    await page.locator('div').filter({ hasText: /^Name$/ }).getByTestId('userProfileName').fill(name);
    await page.locator('div').filter({ hasText: /^Surname$/ }).getByTestId('userProfileSurname').click();
    await page.locator('div').filter({ hasText: /^Surname$/ }).getByTestId('userProfileSurname').fill(surname);
    await page.getByTestId('saveBtnUserProfile').click();

    await expect(page.getByRole('heading', { name: `${name} ${surname}` })).toBeVisible()
    await expect(page.getByTestId('dropdownUserProfile')).toBeVisible()
    
    await page.getByTestId('dropdownUserProfile').click();
    await page.getByTestId('dropdown').click();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill('new name');
    await page.getByRole('button', { name: 'Save' }).click();
    
    await expect(page.getByRole('heading', { name: `new name ${surname}` })).toBeVisible()
  })

})