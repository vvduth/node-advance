const puppeteer = require("puppeteer");

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
}

module.exports = CustomPage;
