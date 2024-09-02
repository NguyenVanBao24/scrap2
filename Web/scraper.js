const scrapeCategory = async (browser, url, objectSearch, locationSearch) => {
  const dataShop = [];
  let currentPage = 1;

  try {
    const page = await browser.newPage();
    console.log(' >> mở tab mới');
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36');

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

    // page.on('console', (consoleObj) => console.log(consoleObj.text()));

    while (true) {
      // Lấy dữ liệu trên trang hiện tại
      const shopsOnPage = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-ypid]');
        return Array.from(elements).map((el) => {
          try {
            const name = el.querySelector('.info .info-primary .business-name span');
            const description = el.querySelector('.categories > a');
            const phone = el.querySelector('.phones.phone');
            const street = el.querySelector('.adr > .street-address');
            const location = el.querySelector('.adr > .locality');
            return {
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

      // Kiểm tra số lượng trang và điều hướng đến trang tiếp theo nếu có
      const isNext = await page.$('.pagination .next.ajax-page');
      if (isNext) {
        await page.click('.pagination .next.ajax-page');
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 150000 });
        currentPage++;
        await new Promise((resolve) => setTimeout(resolve, 500)); // Đợi một chút trước khi tiếp tục
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
