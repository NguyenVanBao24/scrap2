const startBrowser = require('./browser');
const scrapeControllers = require('./scrapeController');

let browser = startBrowser();
scrapeControllers(browser);
