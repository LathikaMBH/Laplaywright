import { expect, test } from "@playwright/test";




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

test('Browser Context Playwright test- validate error message', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator('[name="username"]').fill("Admin");
    await page.locator('[name="password"]').fill("admin1234"); 
    await page.locator('[type="submit"]').click();
    console.log(await page.locator('[role= "alert"]').textContent());
    await expect(page.locator('[role= "alert"]')).toContainText("Invalid credentials");

});

//extract text from specific element when there are multiple elements

test.only('Select one element amoung multiple same elements', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('[name="username"]').fill("rahulshettyacademy");
    await page.locator('[name="password"]').fill("learning"); 
    await page.locator('[type="submit"]').click();
    console.log(await page.locator(".card-body a").nth(0).textContent());

});