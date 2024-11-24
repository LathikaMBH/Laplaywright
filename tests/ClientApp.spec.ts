import test from "@playwright/test";


test('Browser Context-Validating Error Login', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("lathika.mbh@gmail.com");
    await page.locator("#userPassword").fill("Lathika@123");
    await page.locator("[value='Login']").click();

    // wait machnisum - 1st method

    await page.waitForLoadState('networkidle');

    const title = await page.locator(".card-body b").allTextContents();

    console.log(title);

});