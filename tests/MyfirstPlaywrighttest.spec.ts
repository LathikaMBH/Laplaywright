import { expect } from "@playwright/test";

const { test } = require('@playwright/test');

test('Browser Context Playwright test', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator('[name="username"]').fill("Admin");
    await page.locator('[name="password"]').type("admin123"); 
    await page.locator('[type="submit"]').click();

});

test('Page Playwright test', async({page})=>
{
    await page.goto("https://playwright.dev/");
    //get the title -> assert it
    console.log(await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

});

//wrong username and password + validate error message + extract text + Containstext

test.only('Browser Context Playwright test- validate error message', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator('[name="username"]').fill("Admin");
    await page.locator('[name="password"]').type("admin1234"); 
    await page.locator('[type="submit"]').click();
    console.log(await page.locator('[role= "alert"]').textContent());
    await expect(page.locator('[role= "alert"]')).toContainText("Invalid credentials");

});