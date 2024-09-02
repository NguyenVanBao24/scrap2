const scrapeGoogleMaps = require('./scraper');
const keywords = require('./keywords');

const main = async () => {
  for (const keyword of keywords) {
    await scrapeGoogleMaps(keyword);
  }
};

main();
