import { expect } from "@playwright/test";

const { test } = require('@playwright/test');

test('Browser Context Playwright test', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

});

test.only('Page Playwright test', async({page})=>
{
    await page.goto("https://playwright.dev/");
    //get the title -> assert it
    console.log(await page.title());
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

});