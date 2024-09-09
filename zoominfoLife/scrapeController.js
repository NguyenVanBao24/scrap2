const scrapes = require('./scraper');
const dotenv = require('dotenv');
dotenv.config();
const StorePath = require('./storePath');
const { deleteDuplicate } = require('./FillterInner/FillterData');

const scrapeControllers = async (browserInstance) => {
  const url = process.env.URL_ZOOMINFO_PAGE;

  try {
    let browser = await browserInstance;

    const data = await scrapes.scrapeCategory(browser, url);
    // const dataByDeleteDublicate = deleteDuplicate(data, 'companyName');
    StorePath(data, 'data', 'zoominfo');
  } catch (error) {
    console.log('lỗi ở scrape controllers', error);
  }
};

module.exports = scrapeControllers;
