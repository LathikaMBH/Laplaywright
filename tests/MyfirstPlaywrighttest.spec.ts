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

test('Select one element amoung multiple same elements', async({page})=>
{
    const cardTitle = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator('[name="username"]').fill("rahulshettyacademy");
    await page.locator('[name="password"]').fill("learning"); 
    await page.locator('[type="submit"]').click();
    //console.log(await page.locator(".card-body a").nth(0).textContent());
    const alltitles = await cardTitle.allTextContents();
    console.log(alltitles);

});

test.only('UI controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*= 'documents-request']");

    //select option from dropdown
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");

    //select radio button and verify whether it selected or not
    await page.locator(".radiotextsty").last().click();
    await page.locator("[id='okayBtn']").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    //checked check box
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
   // await page.pause();

   await expect(documentLink).toHaveAttribute("class", "blinkingText");

});

test.only('Child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*= 'documents-request']");

    const [newPage] = await Promise.all([

    //listing untill new page getting open in nw tab - lecture 20
    context.waitForEvent('page'),
    documentLink.click()
    ])


    
    //here we extract the text from new page : Please email us at mentor@rahulshettyacademy.com with below template to receive response
    // now we need to extract rahulshettyacademy.com from the above text.
    const text = await newPage.locator(".red").textContent();
    const arrayText1 = text?.split("@");
    //const email = arrayText1[1].split(" ")[0]
    //console.log(email);



});