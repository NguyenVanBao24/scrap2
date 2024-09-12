const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox'],
      ignoreDefaultArgs: true,
    });

    return browser;
  } catch (error) {
    console.log('KHONG TAO DUOC BROWSER ERROR: ' + error);
  }
};

module.exports = startBrowser;
