const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const { userAgents, proxies } = require('../zoominfoLife/utils/ramdom');

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

const scrapeCategory = async (url, objectSearch, locationSearch) => {
  const dataShop = [];
  let currentPage = 1;

  try {
    const proxy = getRandomElement(proxies);
    const userAgent = getRandomElement(userAgents);

    console.log('------------------------', `--proxy-server=http://${proxy.host}:${proxy.port}`);
    console.log('------------------------', userAgent);
    const browser = await puppeteer.launch({
      args: ['--disable-setuid-sandbox'],
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: true,
      ignoreDefaultArgs: true,
    });

    console.log('proxy use ----------', browser);

    const page = await browser.newPage();

    await page.authenticate({ login, password });
    console.log({ login, password });
    page.setDefaultNavigationTimeout(300000); // 5 phút
    page.setDefaultTimeout(300000); // 5 phút

    console.log(' >> mở tab mới');
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150000 });
    console.log(' >> truy cập URL', url);

    await page.waitForSelector('#content-container', { timeout: 150000 });
    console.log(' >> web đã load xong');

    await page.evaluate(
      (objectSearch, locationSearch) => {
        const queryInput = document.querySelector('#query');
        const locationInput = document.querySelector('#location');
        if (queryInput && locationInput) {
          queryInput.value = objectSearch;
          locationInput.value = locationSearch;
        }
      },
      objectSearch,
      locationSearch,
    );

    await page.click('button[value="Find"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 150000 });

    page.on('console', (consoleObj) => console.log(consoleObj.text()));

    while (true) {
      const shopsOnPage = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-ypid]');
        return Array.from(elements).map((el) => {
          try {
            const name = el.querySelector('.info .info-primary .business-name span');
            const description = el.querySelector('.categories > a');
            const phone = el.querySelector('.phones.phone');
            const street = el.querySelector('.adr > .street-address');
            const location = el.querySelector('.adr > .locality');
            const dataYpid = el.getAttribute('data-ypid');
            return {
              dataYpid: dataYpid || 'N/A',
              name: name ? name.innerText : 'N/A',
              description: description ? description.innerText : 'N/A',
              phone: phone ? phone.innerText : 'N/A',
              address: `street: ${street ? street.innerText : 'N/A'} location: ${location ? location.innerText : 'N/A'}`,
            };
          } catch (err) {
            console.error('Lỗi khi lấy dữ liệu của một phần tử:', err);
            return {
              dataYpid: 'N/A',
              name: 'N/A',
              description: 'N/A',
              phone: 'N/A',
              address: 'N/A',
            };
          }
        });
      });

      dataShop.push(...shopsOnPage);

      const isNext = await page.$('.pagination .next.ajax-page');
      if (isNext) {
        await page.click('.pagination .next.ajax-page');
        console.log('first');
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 150000 });
        currentPage++;
      } else {
        break;
      }
    }

    await page.close();
    console.log(' >> hoàn thành cào dữ liệu');
    return dataShop;
  } catch (error) {
    console.error('Lỗi ở scrapeCategory:', error);
    throw error;
  }
};

module.exports = { scrapeCategory };
