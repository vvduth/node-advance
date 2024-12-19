const Page = require("./helpers/page");
let page;
beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", async () => {
  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });
  test("can see blog create form", async (done) => {
    const label = await page.getContentsOf("form label");
    expect(label).toEqual("Blog Title");
    done();
  });

  describe("and using valid input", async () => {
    beforeEach(async () => {
      const titleSelector = ".title input";
      await page.type(titleSelector, "My valid title");
      await page.type(".content input", "valid content");
      await page.click("form button");
    });
    test("submiting takes user to review screen", async () => {
      const text = await page.getContentsOf("h5");
      expect(text).toEqual("Please confirm your entries");
    });
    test("submiting the saving adds blog to index page", async () => {
      const cardSelector = ".card-title";
      await page.click("button.green");
      await page.waitFor(".card");

      const title = await page.getContentsOf(cardSelector);
      const content = await page.getContentsOf("p");

      expect(title).toEqual("My valid title");
      expect(content).toEqual("valid content");
    });
  });

  describe("and using invalid input", async () => {
    beforeEach(async () => {
      await page.click("form button");
    });

    test("the form shows error message", async () => {
      const titleError = await page.getContentsOf(".title .red-text");
      const contentError = await page.getContentsOf(".content .red-text");
      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });
});
