const puppeteer = require("puppeteer");
const sessionfactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");
// need browser to make the page

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return browser[property] || customPage[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionfactory(user);
  
    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.goto("localhost:3000/blogs");
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, el => el.innerHTML)
  }
}

module.exports = CustomPage;
