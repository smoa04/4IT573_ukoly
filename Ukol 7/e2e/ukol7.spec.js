// e2e/newTests.spec.js
import { test, expect } from '@playwright/test';

test.describe('E2E testy pro Ukol 7', () => {
    test('Registrace uživatele', async ({ page, context }) => {
        await page.goto('/register');
        await page.fill('input[name="username"]', 'novyUzivatel');
        await page.fill('input[name="password"]', 'tajneHeslo');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('/');
        const cookies = await context.cookies();
        const tokenCookie = cookies.find(cookie => cookie.name === 'token');
        expect(tokenCookie).toBeDefined();
    });

    test('Vytvoření nové ToDo položky', async ({ page }) => {
        await page.goto('/');
        await page.fill('input[name="title"]', 'Nový úkol');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Nový úkol')).toBeVisible();
    });

    test('Úprava ToDo položky', async ({ page }) => {
        await page.goto('/');
        await page.fill('input[name="title"]', 'Původní úkol');
        await page.click('button[type="submit"]');
        const detailLink = page.locator('a').first();
        const href = await detailLink.getAttribute('href');
        await page.goto(href);

        await page.fill('input[name="title"]', 'Upravený úkol');
        await page.click('button[type="submit"]');
        await expect(page.locator('text=Upravený úkol')).toBeVisible();
    });

    test('Přepnutí stavu ToDo položky', async ({ page }) => {
        await page.goto('/');
        const toggleLink = page.locator('a:has-text("nedokončeno"), a:has-text("dokončeno")').first();
        await toggleLink.click();
        await expect(page).toHaveURL('/');
    });

    test('Odstranění ToDo položky', async ({ page }) => {
        await page.goto('/');
        await page.fill('input[name="title"]', 'Úkol k odstranění');
        await page.click('button[type="submit"]');
        const deleteLink = page.locator('a', { hasText: 'odebrat' }).first();
        const todoText = await deleteLink.evaluate(node => node.parentElement.textContent);
        await deleteLink.click();
        await expect(page.locator(`text=${todoText.trim()}`)).toHaveCount(0);
    });

    test('Přístup na /mytodos bez přihlášení', async ({ page, context }) => {
        await context.clearCookies();
        await page.goto('/mytodos');
        await expect(page.locator('body')).toContainText('404');
    });

    test('Přístup na /mytodos po registraci', async ({ page }) => {
        await page.goto('/register');
        await page.fill('input[name="username"]', 'uzivatelTest');
        await page.fill('input[name="password"]', 'hesloTest');
        await page.click('button[type="submit"]');
        await expect(page).toHaveURL('/');
        await page.goto('/mytodos');
        await expect(page.locator('body')).toContainText(/todos of uzivatelTest/i);

    });
});
