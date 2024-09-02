const scrapes = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();
const StorePath = require('./storePath');
const { names, locations, acronymLocation } = require('./nameOfSearch');

const scrapeControllers = async (browserInstance) => {
  const url = process.env.URL_YELLOW_PAGE;

  try {
    let browser = await browserInstance;
    for (const name of names) {
      for (const location of locations) {
        const categories = await scrapes.scrapeCategory(browser, url, name, `${location}, ${acronymLocation}`);
        StorePath(location, categories);
      }
    }
  } catch (error) {
    console.log('lỗi ở scrape controllers', error);
  }
};

module.exports = scrapeControllers;
