const scrapes = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();
const StorePath = require('./storePath');
const { names, locations, acronymLocation } = require('./nameOfSearch');

const scrapeControllers = async () => {
  const url = process.env.URL_YELLOW_PAGE;

  try {
    for (const name of names) {
      for (const location of locations) {
        const categories = await scrapes.scrapeCategory(url, name, `${location}, ${acronymLocation}`);
        StorePath(location, categories, 'data_sport');
      }
    }
  } catch (error) {
    console.log('lỗi ở scrape controllers', error);
  }
};

module.exports = scrapeControllers;
