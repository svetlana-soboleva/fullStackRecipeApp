import { test, expect } from '@playwright/test'
import { loginNewUser } from 'utils/api'
import { fakeUser } from 'utils/fakeData'

const { email, password } = fakeUser()

test.describe.serial('signup and login sequence', () => {
  test('visitor can signup', async ({ page }) => {

    await page.goto('/signup')
    const successMessage = page.getByTestId('successMessage')
    await expect(successMessage).toBeHidden() 
    const form = page.getByRole('form', { name: 'Signup' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('button[type="submit"]').click()

  })

  test('visitor can not access dashboard before login', async ({ page }) => {
    await page.goto('/dashboard')

    await page.waitForURL('/login')
  })

  test('visitor can login', async ({ page }) => {
    await page.goto('/login')
    const welcomeMsg = page.getByTestId('welcome')
    await expect(welcomeMsg).toBeHidden()

    const form = page.getByRole('form', { name: 'Login' })
    await form.locator('input[type="email"]').fill(email)
    await form.locator('input[type="password"]').fill(password)
    await form.locator('button[type="submit"]').click()
  })
})


test('visitor can logout', async ({ page }) => {
  await loginNewUser(page)

  await page.goto('/dashboard')
  const logoutLink = page.getByRole('button', { name: 'Logout' })


  await logoutLink.click()

  await expect(logoutLink).toBeHidden()
  await expect(page).toHaveURL('/login')

  await page.goto('/dashboard')
  await expect(logoutLink).toBeHidden()
  await expect(page).toHaveURL('/login')
})
