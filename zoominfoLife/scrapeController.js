const scrapes = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();
const StorePath = require('./storePath');
const { names } = require('./nameOfSearch');

const scrapeControllers = async (browserInstance) => {
  const url = process.env.URL_ZOOMINFO_PAGE;

  try {
    let browser = await browserInstance;

    const categories = await scrapes.scrapeCategory(browser, url);
    StorePath('zoominfo', categories);
  } catch (error) {
    console.log('lỗi ở scrape controllers', error);
  }
};

module.exports = scrapeControllers;
