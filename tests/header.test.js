// testing the header of our application

const Page = require("./helpers/page");

let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("http://localhost:3000");
});

afterEach(async (done) => {
  done()
  await page.close();
  
});

test("the header has the correct text", async () => {
  const text = await page.getContentsOf("a.brand-logo");

  expect(text).toEqual("Blogster");
});



test("When signed in , shows log out button", async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual("Logout");
});
