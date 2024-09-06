const startBrowser = require('../Web/browser');
const scrapeControllers = require('./scrapeController');

let browser = startBrowser();
scrapeControllers(browser);
