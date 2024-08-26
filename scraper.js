const scrapeCategory = async (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let page = await browser.newPage();
      console.log(" >> mở tab mới");
      await page.goto(url);
      console.log(" >> truy cập ủrl", url);

      await page.waitForSelector("#webpage");
      console.log(" >> web đã laod xong");

      const dataCategories = await page.$$eval(" #navbar-menu > ul > li", (els) => {
        dataCategories = els.map((el) => {
          return {
            category: el.querySelector("a").innerText,
            link: el.querySelector("a").href,
          };
        });
        return dataCategories;
      });

      await page.close();

      resolve(dataCategories);
    } catch (error) {
      console.log("lỗi ở scrape category", error);
      reject(error);
    }
  });

const scraper = (browser, url) =>
  new Promise(async (resolve, reject) => {
    try {
      let newPage = await browser.newPage();
      console.log("da mo tab moi...");
      await newPage.goto(url);
      console.log("truy cap vao trang", url);
      await newPage.waitForSelector("#main");
      console.log("dang load xong main");

      const scrapeData = {};

      const headerData = await newPage.$eval("header ", (el) => {
        return {
          title: el.querySelector("h1").innerText,
          description: el.querySelector("p").innerText,
        };
      });
      console.log(headerData);

      await newPage.close();
      resolve();
      console.log(" >> trinhd duyet da dong");
    } catch (error) {
      reject(error);
    }
  });

module.exports = { scrapeCategory, scraper };
// aksdjalsjkdajksdk
