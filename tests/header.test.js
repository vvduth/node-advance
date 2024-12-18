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
  //await browser.close();
});

test("the header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

  expect(text).toEqual("Blogster");
});

test("clicking log in start oauth flow", async () => {
  await page.click(".right a");

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test.only("When signed in , shows log out button", async () => {
  const id = "676022c788057a72a89a1a14";

  const Buffer = require("safe-buffer").Buffer;
  const sessionObject = {
    passport: {
      user: id,
    },
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const Keygrip = require("keygrip");
  const keys = require("../config/keys");
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign("session=" + sessionString);

  await page.setCookie({ name: "session", value: sessionString });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("localhost:3000");
});
