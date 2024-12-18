
const puppeteer = require("puppeteer");
// testing the header of our application
test("adds two mumbers", () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test("try to laucnh a browser", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  await page.goto('localhost:3000')
});
