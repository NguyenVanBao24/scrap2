const scrapes = require("./scraper");

const scrapeControllers = async (browserInstance) => {
  const url = "https://phongtro123.com/";
  const indexs = [1, 2, 3, 4];

  try {
    let browser = await browserInstance;
    const categories = await scrapes.scrapeCategory(browser, url);
    const selectedCategories = categories.filter((category, index) =>
      indexs.some((i) => i === index)
    );

    console.log(" link", selectedCategories[0].link);
    await scrapes.scraper(browser, selectedCategories[0].link);
  } catch (error) {
    console.log("lỗi ở scrape controllers", error);
  }
};

module.exports = scrapeControllers;
