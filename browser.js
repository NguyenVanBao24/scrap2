const puppeteer = require("puppeteer");

const startBrowser = async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox"],
      ignoreDefaultArgs: true,
    });

    return browser;
  } catch (error) {
    console.log("KHONG TAO DUOC BROWSER ERROR: " + error);
  }
};

module.exports = startBrowser;
