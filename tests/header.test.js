const puppeteer = require("puppeteer");
// testing the header of our application
let browser, page;
beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });

  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
    await browser.close();
})

test("try to laucnh a browser", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});
